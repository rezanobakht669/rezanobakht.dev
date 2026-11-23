---
layout: ../../layouts/Post.astro
title: "Laravel 5.6 to 13 on a live payment platform, with zero downtime"
date: "2026-11-23"
lang: en
description: "Ten framework upgrades, PHP 7.1 to 8.3, no maintenance window. What actually worked."
---

Our payment platform was born in 2019 on Laravel 5.6 and PHP 7.1. Money moves through it every hour, so a maintenance window was never an option, and a rewrite was never on the table.

By July 2026 it ran Laravel 13 on PHP 8.3. Here is the path, straight from the git history:

```
2024-05  5.6 -> 5.7 -> 5.8
2024-10  6
2025-01  7
2025-02  8
2025-03  9
2026-06  10 -> 11
2026-07  12 -> 13
```

Ten hops. No downtime. Here is what made that possible.

## 1. One major at a time. Never skip.

Jumping from 5 to 13 in one branch means debugging every upgrade guide at once. One hop at a time means one guide, one set of breaking changes, one rollback target. Boring is the point.

## 2. Every hop is a normal release

Each upgrade got its own branch (`upgrade/laravel-11`) and went the same road as any feature: develop, staging, main. No long-lived "big upgrade" branch that rots while the business keeps moving. Over the same window the team shipped about 2,000 other commits. Features never stopped.

## 3. Let a tool do the boring diff

Most of an upgrade is mechanical: new config files, moved middleware, `Input` to `Request`, removed `array_*` and `str_*` helpers. We used Laravel Shift for that part and spent human time on what a tool cannot judge.

## 4. The framework is easy. The packages are the work.

The framework upgrade guide is honest. Third-party packages are not. Our real blockers were the modules package, a CORS package that had to be replaced, a Jalali date library, and a query-builder package that broke on the last hop. Check every `composer.json` line before you start, not when composer refuses to resolve.

## 5. Stricter PHP finds real bugs

PHP 8's stricter types surfaced a price calculation that had been quietly mixing strings and numbers. On a payment platform, that is not a nuisance. That is the upgrade paying for itself.

## 6. Fix on the oldest open branch, merge forward

When a bug showed up on the Laravel 10 build while 11 was already in progress, the fix went into a `hotfix/laravel-10-...` branch and was merged forward into `upgrade/laravel-11`. One fix, every branch.

## 7. Fix the database while you are in there

Halfway through, we moved the tables from MyISAM to InnoDB. MyISAM has no transactions, so "transaction" code was doing nothing. For payments, that was the most important change of the whole project, and it was not even a framework change.

## The part nobody puts on a slide

The first six hops took ten months. The last four took 17 days. Same team, same codebase. The difference was a working staging environment, CI on every merge, and the habit of small hops. The upgrade got faster because the process got better, not because the code got easier.

If you are sitting on an old Laravel app: start with the next version, not the latest one.
