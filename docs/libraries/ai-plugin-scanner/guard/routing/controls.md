---
title: Controls
sidebar_position: 5
---

# Controls

A control step paces, suppresses, or windows an alert before it reaches an action. Controls are what keep routing quiet by default. Without them, every matching alert reaches a destination, and the team learns to ignore the channel.

Configure controls in the [Guard Routing Studio](https://hol.org/guard/routing).

## Why controls come before actions

A control sits between a condition and an action. Its job is to decide whether an alert that matched a branch should actually proceed. If the control says no, the alert is held, suppressed, or deferred — it never reaches the action.

The healthy position is:

1. condition routes the alert to a branch
2. control decides whether that branch should fire right now
3. action sends the alert only if the control allows it

This separation means you can change pacing without touching the condition, and change the destination without touching the pacing.

## Control types

Guard provides four control types.

| Control | What it does |
| :--- | :--- |
| **Pacing** | Limits how many alerts reach a channel per time unit |
| **Dedup** | Suppresses duplicate alerts within a window |
| **Rate limiting** | Caps total alerts per workflow per time unit |
| **Windows** | Allows alerts only during defined time windows |

### Pacing

Pacing limits the number of alerts that reach a specific destination per time unit. Use it when a channel can tolerate some alerts but not a burst.

Configuration:

- **channel** — the destination this pacing applies to
- **limit** — maximum alerts allowed in the window
- **window** — the time unit, such as per minute or per hour

When the limit is reached, additional alerts are queued or dropped depending on the control's overflow setting.

### Dedup

Dedup suppresses alerts whose fingerprint has already been seen within a lookback window. It is the single most effective control for reducing noise.

Configuration:

- **fingerprint field** — usually the alert fingerprint computed at the condition step
- **lookback window** — how long to remember a fingerprint before treating it as new again
- **on duplicate** — `suppress` (drop silently) or `digest` (hold for later summary)

A 10-minute window is a common starting point. Shorter windows catch rapid retries; longer windows suppress recurring drift.

### Rate limiting

Rate limiting caps the total number of alerts a workflow can emit per time unit, regardless of channel or fingerprint. Use it as a safety net so a misconfigured trigger cannot flood every destination.

Configuration:

- **limit** — maximum alerts per window across the whole workflow
- **window** — the time unit
- **on overflow** — `drop` or `queue`

Rate limiting is a backstop, not a primary filter. If it fires often, the trigger or dedup control needs tightening.

### Windows

A window control allows alerts to proceed only during defined time windows. The most common use is business-hours-only routing: high-severity alerts page on-call at any hour, while lower-severity alerts wait for the next business window.

Configuration:

- **allowed windows** — one or more time ranges with a timezone
- **on outside-window** — `hold` (deliver when the window opens) or `drop` (discard)

Use `hold` when the alert still matters but is not urgent. Use `drop` only for alerts that are purely informational.

## Configuring control thresholds

Thresholds are the numbers that decide whether a control lets an alert through. A few principles:

- start strict and loosen over time — a quiet channel that occasionally misses an alert is better than a loud channel everyone mutes
- set dedup first — it removes the most noise for the least effort
- set pacing per channel — different destinations tolerate different volumes
- set rate limiting last — it is the backstop, not the primary filter

## Combining controls

A branch can pass through more than one control. They evaluate in order, and an alert must pass every control to reach the action.

A common high-severity branch:

1. dedup with a 10-minute window
2. pacing at 5 alerts per minute to the paging channel
3. action: page on-call

A common low-severity branch:

1. dedup with a 1-hour window
2. window: business hours only
3. action: send to digest

## What controls do not do

Controls do not decide whether an alert is risky — that is a condition's job. They do not send notifications or resolve alerts. If a control seems to need to send a message, add an action after it. If it seems to need to close an alert, add a terminal.

## Troubleshooting

| Symptom | Likely cause |
| :--- | :--- |
| Channel is silent | Pacing or rate limit is too strict; check the overflow setting |
| Channel is flooded | Dedup window is too short or missing; duplicates are passing through |
| Alerts arrive outside business hours | Window control is missing or the timezone is wrong |
| Alerts seem stuck | A control with `hold` overflow is waiting for the window to open |
| Rate limit fires constantly | Trigger is too broad; tighten trigger criteria or shorten the dedup window |

Use **Test run** to see whether a control allowed or blocked a sample alert, and which control stopped it.

## See it in product

- [Guard Routing Studio](https://hol.org/guard/routing)

## Next guides

- [Actions](./actions.md)
- [Terminals](./terminals.md)
