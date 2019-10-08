# Clockwork Card

This is a simple little custom lovelace element that shows a clock and some extra timezones for Home Assistant.

It may break, it may work. For now, it works.

Anyone who wants to fork it and make it better, by all means PLEASE go for it. Will also accept pull requests.

I pretty much stole the idea from [Mikael T](https://community.home-assistant.io/t/palm-springs-theme/103533) and then hacked it up to do what I wanted.

If by some miracle it works it should look like this:![Sample Image](sample.jpg)

## DISCLAIMER

*This was never intended for external use, but was asked a couple times to release it so I did.
Use at own risk, absolutely minimal testing has been completed. Milage may very.*

## INSTALLATION

To install add it to your custom lovelace folder and then reference it accordingly

```yaml
  - url: /local/custom-lovelace/clockwork-card.js
    type: js
```

## CONFIGURATION

Then in your lovelace configuration edit accordingly.
It requires you have an existing [date_time_iso](https://www.home-assistant.io/integrations/time_date/) sensor.

It should be pretty self explanatory.

```Yaml
  - type: 'custom:clockwork-card'
    #title: "My Time"
    locale: en-AU
    entity: sensor.date_time_iso
    other_time:
      - "America/New_York"
      - "Australia/Sydney"
      - "America/Los_Angeles"
```
