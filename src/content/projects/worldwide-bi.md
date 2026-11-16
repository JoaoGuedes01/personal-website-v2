---
title: "Worldwide BI"
summary: "Data Science project meant to study Natural Disasters and extract useful information from huge amounts of data."
type: "Academic"
category: "Data Science & ML"
stack: ["Java", "MySQL", "Talend Open Studio", "Talend Data Quality", "Tableau"]
featured: false
resume: false
order: 98
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
video: "https://www.youtube.com/watch?v=Y-PI2xwVct4"
year: 2021
gallery:                    # optional image gallery (co-located, with lightbox)
    - { src: ./img/worldwide-bi/cover.png, alt: "Cover Image", caption: "Team presentation." }
    - { src: ./img/worldwide-bi/plan.png, alt: "Plan Image", caption: "Our plan." }
    - { src: ./img/worldwide-bi/kimball-lifecycle.png, alt: "Kimball Lifecycle Image", caption: "Kimball Lifecycle." }
    - { src: ./img/worldwide-bi/multidimensional-model.png, alt: "Multidimensional Model Image", caption: "Our multidimensional model." }
    - { src: ./img/worldwide-bi/model-details.png, alt: "Model Details Image", caption: "Our model details." }
    - { src: ./img/worldwide-bi/more-details.png, alt: "More Model Details Image", caption: "More model details." }
    - { src: ./img/worldwide-bi/etl-metrics.png, alt: "ETL Metrics Image", caption: "The ETL metrics." }
    - { src: ./img/worldwide-bi/etl-env-org.png, alt: "ETL Environment and Organization Image", caption: "The ETL work environment and organization." }
    - { src: ./img/worldwide-bi/fact-earthquakes.png, alt: "Fact Earthquakes Image", caption: "Fact table on earthquake occurrences." }
    - { src: ./img/worldwide-bi/dashboards.png, alt: "Dashboards Image", caption: "Our BI Dashboards final result." }
---

## Overview

*WorldWide BI* marked my first true encounter with Data Science and Big Data architecture. The premise for this project was very interesting: take three massive datasets, each containing roughly one million observations regarding natural disasters (Earthquakes, Tsunamis, and Volcanic Eruptions) and transform them from meaningless rows of raw text into actionable, visual insights. It's one of those things where we never really understand how it's done and how hard it is until we try it out for ourselves.

This project was a comprehensive exercise in exploratory data analysis (EDA), database architecture and data visualization.

## Architecture & Data Warehouse

Before any visualization could happen, the data needed a reliable home. Working as part of a team, we designed and developed a custom **Data Warehouse** utilizing a **Dimensional Model (Star Schema)** in **MySQL**.

A key architectural decision was implementing **Slow Changing Dimensions**. This allowed our dimension tables to be updated dynamically over time, ensuring the Data Warehouse could handle new incoming disaster data without requiring a complete wipe and re-population of the database.

## The ETL Pipeline

The most critical, phase of the project was the Data Integration and ETL (Extract, Transform, Load) process. 

*   **Exploration:** Every attribute was meticulously inspected using Talend Data Quality to identify anomalies, outliers, and problematic data.
*   **Transformation:** We developed custom ETL scripts in **Java** using Talend Open Studio. 
*   **Sanitization:** To ensure data integrity, we implemented a pattern-based sanitization process. For example, null or empty values were systematically replaced with the maximum out-of-bounds value for their specific scale (e.g., assigning '99' on a 1-10 scale) to keep the data clean without losing the row entirely.

## Analytics & Visualization

With a populated Data Warehouse and clean data, we built highly optimized View Tables specifically tailored for analytics. 

These views were connected to **Tableau**, where we designed and implemented a series of interactive dashboards. It was incredibly rewarding to finally see the culmination of our backend work translate into clean, visual representations of global disaster trends.

## Retrospective

Diving blindly into Data Science was a massive challenge. It required revisiting forgotten statistical techniques, navigating the complexities of large-team dynamics, and piecing together Data Warehousing concepts with limited clear online documentation. 

However, the struggle was entirely worth it. The project earned a perfect score (20/20) and provided a highly realistic depiction of what working with Big Data looks like in the industry. It laid the foundational knowledge for my ongoing interest in data-driven engineering and proved that with the right pipelines, even a million rows of chaos can make perfect sense.