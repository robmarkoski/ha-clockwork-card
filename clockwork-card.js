// Taken from https://community.home-assistant.io/t/palm-springs-theme/103533
// Heavily modified to the point of not being similar.
// https://github.com/robmarkoski/ha-clockwork-card

class ClockWorkCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }

    /* This is called every time sensor is updated */
    set hass(hass) {

        const config = this.config;

        const entityId = this.config.entity;
        var _other_locales = config.other_time;
        const state = hass.states[entityId];
        const stateStr = state ? state.state : "Unavailable";
        const locale = config.locale;
        const _locale = locale ? locale : undefined;
        //console.log(locale)
        //console.log("Other Locales: " + _other_locales[1]);
        /* 
        This Builds Date. Requires to have date: and time: Set in config.
        This may be used in future build but probably not.
        var _dateState = hass.states[config.date].state;

        var _date_time = new Date(_dateState + "T" + hass.states[this.config.time].state);
        */
        if (stateStr == "Unavailable") {
            throw new Error("Sensor State Unavailable");
        }
        var _date_time = new Date(stateStr);
        if (_date_time == "Invalid Date") {
            throw new Error("Invalid date. Ensure its a ISO Date")
        }

        var _time = _date_time.toLocaleTimeString(_locale, {
            hour: 'numeric',
            minute: 'numeric'
        });
        var _date = _date_time.toLocaleDateString(_locale, {
            weekday : 'long',
            day : 'numeric',
            month : 'long'
        });

        var otherclocks = `
            <div class = "other_clocks">
            `;
        var i;
        var j = _other_locales.length;
        for (i= 0; i < j; i++) {
            var _tztime = _date_time.toLocaleTimeString(_locale, {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: _other_locales[i],
                weekday: 'short'
            }); 
            
            otherclocks = otherclocks + `
                <div class="tz_locale">${_other_locales[i]} </div> 
                <div class="otime"> ${_tztime} </div>
            `;
            //console.log(_tztime);
        };
        otherclocks = otherclocks + `
            </div>
            `;
        /*console.log(otherclocks);*/
        var local_time = `
            <div class="clock">
                <div class="time" id="time">${_time}</div>
                <div class="date" id="date">${_date}</div>
            </div>
        `;
        
        var clock_contents = local_time + otherclocks;
       /* console.log("Clock Contents: " + clock_contents);*/
        this.shadowRoot.getElementById('container').innerHTML = clock_contents;
    }

    /* This is called only when config is updated */
    setConfig(config) {
        if (!config.entity) {
            throw new Error('You must define an entity')
        }
        
        /*console.log(_other_locales);*/
        const root = this.shadowRoot;
        if (root.lastChild) root.removeChild(root.lastChild);

        this.config = config;

        const card = document.createElement('ha-card');
        const content = document.createElement('div');
        const style = document.createElement('style')
  
        style.textContent = `
            .container {
                padding: 10px 16px 5px;
                display:flex;
            }
            .clock {
                width:100%;
                padding: 10px 5px 10px 0px;
            }
            .other_clocks {
                float: right;

            }
            .otime {
                padding: 0px 10px 2px;
                font-size: 1.1em;
                font-family: var(--paper-font-headline_-_font-family);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }
            .tz_locale {
                padding: 0px 10px 1px;
                color: var(--secondary-text-color);
                font-size: 0.82em;
                font-family: var(--paper-font-headline_-_font-family);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }     
            .time {
                padding: 
                font-family: var(--paper-font-headline_-_font-family);
                -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
                font-size: 4.1em;
                font-weight: var(--paper-font-headline_-_font-weight);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                line-height: 1em;
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }
            .date {

                font-family: var(--paper-font-headline_-_font-family);
                -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
                font-size: 1.7em;
                font-weight: var(--paper-font-headline_-_font-weight);
                letter-spacing: var(--paper-font-headline_-_letter-spacing);
                line-height: var(--paper-font-headline_-_line-height);
                text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
            }          
        `;
     
        content.id = "container";
        content.className = "container";
        card.header = config.title;
        card.appendChild(style);
        card.appendChild(content);
        
        root.appendChild(card);
      }
  
    // The height of the card.
    getCardSize() {
      return 3;
    }
}
  
  customElements.define('clockwork-card', ClockWorkCard);
