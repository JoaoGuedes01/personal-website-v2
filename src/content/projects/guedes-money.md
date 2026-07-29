---
title: "Guedes Money"
summary: "A CLI interface for interacting with Portal das Finanças automatically and programmatically."
type: "Personal"
category: "Backend & Systems Architecture"
stack: ["Python", "Selenium", "Typer", "Jupyter Notebooks", "bumpversion", "PyPI"]
featured: false
resume: false
order: 81
draft: false
repo: "https://github.com/JoaoGuedes01/scraper_portal_financas"
demo: "https://pypi.org/project/guedesmoney/"
year: 2024
gallery:
  - { src: ./img/guedes-money/pypi.png, alt: "Package Image", caption: "The guedesmoney package published in pypi." }
  - { src: ./img/guedes-money/version.png, alt: "Package Version Image", caption: "Printing out the currently installed version of GuedesMoney." }
  - { src: ./img/guedes-money/help.png, alt: "Package Help Image", caption: "Listing all features of GuedesMoney with --help command flag." }
  - { src: ./img/guedes-money/config.png, alt: "Config Image", caption: "Printing out non-sensitive config information (omitting password)." }
  - { src: ./img/guedes-money/login.png, alt: "Login Image", caption: "Log in to your Portal das Financas account based on GuedesMoney config." }
  - { src: ./img/guedes-money/email.png, alt: "Email Image", caption: "Getting emails with run outcomes after running GuedesMoney." }
  - { src: ./img/guedes-money/fiscal.png, alt: "Fiscal Situation Image", caption: "Fiscal situation portion of the report email." }
  - { src: ./img/guedes-money/attachments.png, alt: "Attachments Image", caption: "Attachments on the report e-mail are prints of every section the scrapper visited during session." }
---

:::danger[Deprecated Project]
Portal das Finanças has since overhauled its interface and now enforces two-factor authentication, and both changes break this scraper's automated login and navigation entirely. I don't plan to patch Guedes Money as it stands, instead, I intend to reverse engineer the portal's underlying API and build a proper interface on top of it, rather than a brittle screen scraper.
:::

## Overview

*Guedes Money* set out to solve a very Portuguese chore: keeping tabs on Portal das Finanças, the national tax authority portal. Checking your fiscal situation, alerts, messages, and pending payments normally means logging into a clunky web portal and clicking through the same handful of pages over and over. I wanted to reduce that ritual to a single command.

The result is a Python CLI tool that logs into the portal on your behalf, visits each relevant section, and reports back, either straight to your terminal or as a tidy email summary. I built it as a real, distributable package rather than a throwaway script, publishing it to **PyPI** so it could be installed anywhere with a simple `pip install guedesmoney`.

## Core Features & Capabilities

The tool wraps the portal's most useful sections behind clean, self-documenting commands:

*   **Section Checks:** Dedicated commands for the most important parts of the portal: `check-fiscal`, `check-alerts`, `check-messages`, `check-interactions`, and `check-payments` (broken down into current, missing, and refund states).
*   **One-Shot `run` Command:** A single `run` command that executes every check in sequence, purpose-built to be dropped into an automated pipeline or scheduled job.
*   **Email Reporting:** After a run, the tool compiles the outcomes into an email report, complete with a per-section breakdown and screenshot attachments of every page the scraper visited, so you can trust what it saw.
*   **Config-Driven Credentials:** A `config` command stores your NIF/password, email provider details, and recipient list once, printing back everything non-sensitive while keeping the password out of sight.
*   **Server-Friendly by Design:** Headless browser mode, optional screenshot capture, and result persistence to file make it comfortable to run unattended on a server.

## Architecture & Technical Choices

The project is a thin, ergonomic CLI wrapped around a headless browser automation core:

*   **Typer-Powered CLI:** Built on **Typer**, giving the tool an intuitive `guedesmoney <command> <args> <options>` structure with auto-generated `--help` output for free.
*   **Selenium Automation:** Under the hood, **Selenium** drives a headless browser to authenticate and navigate the portal, scraping each section's contents and capturing screenshots as it goes.
*   **Prototype-to-Package Workflow:** Scraping flows were explored in **Jupyter Notebooks** before being consolidated into the CLI, then versioned with `bumpversion` and published to the **PyPI** registry as a properly installable MIT-licensed package.

## Retrospective

*Guedes Money* was a satisfying exercise in turning a tedious manual routine into a single automated command, and in taking a personal utility all the way through to a published, installable package.

It was also a lesson in the fragility of scraping. A tool that depends on someone else's UI is only ever one redesign away from breaking, and that's exactly what happened here once the portal changed its interface and added two-factor authentication. That fragility is precisely why the natural next step isn't to keep patching the scraper, but to go deeper and build against the portal's API directly. Guedes Money did its job, and taught me where the real foundation should be.
