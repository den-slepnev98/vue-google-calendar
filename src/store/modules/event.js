import moment from 'moment'

export default {
    state: {
        events: [],
        filteredEvents: [],
        gapi: null
    },
    getters: {
        allEvents(state){
            return state.filteredEvents
        },
        nearestEvents(state) {
            return state.events.filter(event=> {
                let date = moment(event.start.date || event.start.dateTime).format("L");
                return moment(date).isBetween(moment(), moment().add(2, "days"))
            })
        },
        getEventById: state => id => {
            if(id) {
                return state.events.find(event => event.id.toString() === id.toString())
            } else {
                return null
            }
        }
    },
    mutations: {
        set_events(state, value) {
            state.events = value;
            state.filteredEvents = value;
        },
        create_event(state, newEvent) {
            state.events.unshift(newEvent)
        },
        SET_GAPI(state, gapi) {
            state.gapi = gapi
        },
        FILTER_EVENTS(state, {start, end}) {
            let _start = moment(start, 'DD/MM/YYYY').format("L");
            let _end = moment(end, 'DD/MM/YYYY').format("L");

            if(start && end) {
                state.filteredEvents = state.events.filter(event => {
                    let date = moment(event.start.date || event.start.dateTime).format("L");

                    return moment(date).isBetween(moment(_start).add(-1, "days"), moment(_end).add(1, "days"))
                })
            } else if(start && !end) {
                state.filteredEvents = state.events.filter(event => {
                    let date = moment(event.start.date || event.start.dateTime).format("L");

                    return moment(date) >= moment(_start);
                })
            } else if(!start && end) {
                state.filteredEvents = state.events.filter(event => {
                    let date = moment(event.start.date || event.start.dateTime).format("L");

                    return moment(date) <= moment(_end);
                })
            } else {
                state.filteredEvents = state.events
            }
        },
        UPDATE_EVENT_BY_ID(state, {id, event}) {
            let index = state.events.findIndex(e=> e.id == id);
            if(index !== -1) {
                state.events[index] = event;
            }
        },
        REMOVE_EVENT(state, eventId) {
            state.events = state.events.filter(event => event.id.toString() !== eventId.toString());
            state.filteredEvents = state.events;
        }
    },
    actions: {
        fetchEvents({commit, state}) {
            if(state.gapi) {
                state.gapi.client.calendar.events.list({
                    calendarId: "primary",
                    timeMin: new Date().toISOString(),
                    timeZone: "Europe/Kiev",
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 100,
                    orderBy: "startTime"
                }).then(response => {
                    let items = response.result.items;
                    if (items && Array.isArray(items)) {
                        commit('set_events', items)
                    }
                });
            }
        },
        insertEvent({commit, state}, event) {
            if(event && state.gapi) {
                state.gapi.client.calendar.events.insert({
                    calendarId: "primary",
                    resource: event
                }).then(response => {
                    if(response.status === 200) {
                        commit('create_event', event)
                    }
                });
            }
        },
        removeEvent({commit, state}, eventId) {
            if(eventId && state.gapi) {
                state.gapi.client.calendar.events.delete({
                    calendarId: "primary",
                    eventId: eventId
                }).then(response => {
                    return commit('REMOVE_EVENT', eventId);
                })
            }
        },
        initGapi({commit}, gapi) {
            if(gapi) {
                commit('SET_GAPI', gapi);
            } else {
                commit('SET_GAPI', null);
            }
        },
        updateEvent({commit, state}, {id, key, value}) {
            let event = state.events.find(event => event.id == id);
            if(event) {
                let updatedEvent = Object.assign({}, event);
                if(["start", "end"].includes(key)) {

                    if(updatedEvent.start.dateTime && updatedEvent.end.dateTime) {
                        updatedEvent[key] = {
                            dateTime: value,
                            timeZone: "Europe/Kiev"
                        };
                    } else {
                        updatedEvent.start = {
                            dateTime: key === "start" ? value : updatedEvent.start.date + "T00:00:00",
                            timeZone: "Europe/Kiev"
                        };
                        updatedEvent.end = {
                            dateTime: key === "end" ? value : updatedEvent.end.date + "T00:00:00",
                            timeZone: "Europe/Kiev"
                        };
                    }

                } else if("allDay" === key) {
                    console.log(value);
                    updatedEvent["start"] = {
                        date: updatedEvent.start.date || updatedEvent.start.dateTime.split("T")[0],
                        timeZone: "Europe/Kiev"
                    };
                    updatedEvent["end"] = {
                        date: updatedEvent.end.date || updatedEvent.end.dateTime.split("T")[0],
                        timeZone: "Europe/Kiev"
                    }
                }
                else {
                    updatedEvent[key] = value;
                }

                if(state.gapi) {
                    state.gapi.client.calendar.events.update({
                        calendarId: "primary",
                        eventId: id,
                        resource: updatedEvent
                    }).then(response => {
                        if(response.status === 200 && response.result) {
                            updatedEvent.sequence = response.result.sequence;
                            commit("UPDATE_EVENT_BY_ID", {id, event: updatedEvent});
                        }
                    }).catch((err) => {
                        console.log(err.result.error.message)
                    })
                }
            }
        }
    }
}
