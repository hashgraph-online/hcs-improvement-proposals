---
title: Routing overview
sidebar_position: 1
---

# Routing overview

Guard routing is how investigation alerts move from detection to resolution. Instead of every change interrupting every channel, routing lets you define a workflow that decides which alerts matter, how they are enriched, where they branch, how they are paced, and how they finally resolve.

The visual builder for these workflows is the **Guard Routing Studio**, available at [hol.org/guard/routing](https://hol.org/guard/routing).

## Why routing exists

A raw stream of changes is noisy. Some changes are routine. Some indicate real risk. Some need a human now, and some only need a record. Routing exists so the team can shape that stream into signals that match how they actually operate.

Without routing:

- every detected change can fire a notification
- duplicates flood the same channel
- low-severity drift competes with high-severity revocations
- there is no shared record of how an alert was handled

With routing, each alert follows a defined path through steps that filter, enrich, branch, pace, and resolve it before it ever reaches a human.

## The six step types

Every workflow is a sequence of steps. Guard routing recognizes six kinds of steps, and each guide in this section covers one in depth.

| Step type | What it does |
| :--- | :--- |
| **Triggers** | Start a workflow when a matching event occurs |
| **Enrichment** | Add context to the alert before any decision is made |
| **Conditions** | Branch the workflow based on severity, trust score, ecosystem, or custom rules |
| **Controls** | Pace, deduplicate, rate-limit, or window the alert |
| **Actions** | Send the alert to a destination or create or update a record |
| **Terminals** | Resolve the alert into a final state and record the outcome |

A typical workflow moves through these in roughly that order, but routing is flexible. You can branch early, enrich only on one branch, or run controls before conditions. The studio enforces only that a workflow starts with a trigger and ends with a terminal.

## How to access the Routing Studio

1. Sign in at [hol.org](https://hol.org)
2. Open [hol.org/guard/routing](https://hol.org/guard/routing)
3. Choose an existing workflow to edit, or create a new one
4. The studio opens a canvas where each step is a node you can drag, configure, and connect

The studio is the single place to build, test, and publish routing workflows. There is no separate configuration file to hand-edit for cloud workflows.

## Visual workflow builder basics

The canvas uses nodes and edges.

- A **node** is one step: a trigger, an enrichment source, a condition branch, a control, an action, or a terminal.
- An **edge** connects the output of one node to the input of the next. Conditions produce multiple edges, one per branch.
- Each node has a configuration panel that opens when selected. That panel holds the criteria, thresholds, and targets specific to that step type.

Common canvas actions:

- drag a node from the palette onto the canvas to add a step
- click a node to open its configuration panel
- drag from a node output to another node input to connect them
- use the **Test run** button to send a sample event through the workflow and see which path it takes

## A simple first workflow

A healthy first workflow is small and quiet by default:

1. one trigger matching `tool change detected`
2. one enrichment step that attaches registry metadata and trust score
3. one condition that branches on severity: high versus everything else
4. a control on the high branch that deduplicates within a 10-minute window
5. an action on the high branch that sends to Slack
6. a terminal on each branch: `escalated` for high, `resolved` for the rest

Start with that shape, then add branches and controls only when the team's operating pattern makes them necessary.

## Design principles

- **quiet by default** — routing should suppress more than it sends
- **enrich before you decide** — a decision made without context is a guess
- **branch on severity, not on habit** — route by what the alert actually means
- **pace before you notify** — dedup and rate-limit before a message leaves Guard
- **every path ends in a terminal** — an alert without a final state is an alert that is still open

## See it in product

- [Guard Routing Studio](https://hol.org/guard/routing)
- [Guard dashboard](https://hol.org/guard/dashboard)

## Next guides

- [Triggers](./triggers.md)
- [Enrichment](./enrichment.md)
- [Conditions](./conditions.md)
- [Controls](./controls.md)
- [Actions](./actions.md)
- [Terminals](./terminals.md)
