---
title: "Time Series Forecasting"
summary: "This app was built to predict the number of visits a Mall would have in a certain week so the marketing campaigns would be appropriately set up during each day."
type: "Academic"
category: "Data Science & ML"
stack: ["R", "Shiny", "Jupyter Notebooks", "Python", "Anaconda"]
featured: false
resume: false
order: 85
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/JoaoGuedes01/TIAPOSE_R_Data_Mining"
demo: "https://guedes.shinyapps.io/shiny/"
year: 2022
gallery:
  - { src: ./img/time-series-forecasting/dash.png, alt: "Dashboard Image", caption: "The shiny app homepage and dashboard where users can test and see the results of the forecast and optimiazation." }
  - { src: ./img/time-series-forecasting/prediction.png, alt: "Preditcion Image", caption: "The prediction tab displays the crude predictions of how many people will visit the mall in the target week." }
  - { src: ./img/time-series-forecasting/forecast.png, alt: "Forecast Image", caption: "This tab plot the forecast." }
  - { src: ./img/time-series-forecasting/data.png, alt: "Data Image", caption: "This tab displays all the data we were given and allows users to explore it." }
  - { src: ./img/time-series-forecasting/eda.png, alt: "EDA Image", caption: "The EDA tab contains all our EDA process, results and insights." }
  - { src: ./img/time-series-forecasting/scenarios.png, alt: "EDA Image", caption: "The documents the different objective scenarios for the project." }
  - { src: ./img/time-series-forecasting/results.png, alt: "EDA Image", caption: "This tab explores the different models and combinations we tested and compiles the results." }
  - { src: ./img/time-series-forecasting/models.png, alt: "Models Image", caption: "This tab documents the best models and combinations we got after analyzing the results." }
---

### Project Overview

Developed as part of the *Artificial Intelligence Techniques in Forecasting and Optimization in Business Systems* (TIAPOSE) course at the University of Minho (MIEGSI), this project addresses a real-world decision-support problem in commercial retail management. Using daily visitor traffic data provided by an industry partner from a pilot deployment, the system combines **time series predictive forecasting** with **prescriptive optimization** to guide 7-day marketing campaign allocations and maximize business profitability.

The implementation strictly leveraged **R** and Professor Paulo Cortez's **`rminer`** framework, integrating temporal forecasting techniques, scenario-based pre-processing, and web app deployment via **R Shiny**.

---

## Technical Architecture & Methodology

The project strictly adhered to the **CRISP-DM** (Cross-Industry Standard Process for Data Mining) framework across six structured stages:

### 1. Business Understanding
* Defined the core objective: transform raw foot-traffic time-series data into actionable business intelligence by forecasting daily entrance counts and determining optimal marketing spend.
* Formulated the dual-stage framework: Stage 1 predicts daily visitor volumes, while Stage 2 feeds these predictions into an optimization algorithm to select the most profitable promotional campaign strategy for a target 7-day window.

### 2. Data Understanding & Exploratory Analysis (EDA)
* Conducted comprehensive exploratory analysis on historic visitor entry records provided by the IT pilot project.
* Identified temporal patterns, weekly seasonality, peak foot-traffic days, and variance trends across different time horizons.
* Examined data quality, cardinality, missing values, and statistical distribution properties to establish baseline expectations for regression performance.

### 3. Data Preparation & Scenario Engineering
* **Feature Engineering:** Formulated synthetic temporal attributes, combined collinear indicators, and engineered lag variables to capture autoregressive behavior.
* **Outlier & Error Handling:** Cleaned anomalies, imputing or adjusting extreme values that could distort regression boundaries.
* **Scenario Testing:** Designed three distinct pre-processing scenarios with varying feature subsets (selected through manual correlation matrix analysis and automated grid search experiments) to compare model sensitivity across pre-processed inputs.

### 4. Modeling & Backtesting Evaluation
* **Model Families:** Constructed univariate, multivariate, and hybrid time-series regression models using the `rminer` and `forecast` packages in R.
* **Temporal Validation:** Implemented **rolling-window backtesting** and time-aware cross-validation to prevent data leakage and ensure realistic out-of-sample performance evaluation on sequential time-series data.
* **Performance Metrics:** Tracked regression evaluation metrics (RMSE, MAE, MAPE) across each scenario to select the optimal model configuration.

### 5. Prescriptive Optimization Engine
* Fed the 7-day forecasted visitor numbers into a mathematical optimization script.
* Evaluated marketing campaign options against expected visitor traffic conversion rates to determine the optimal budget distribution that maximizes ROI while minimizing marketing acquisition cost.

### 6. Application Deployment
* Developed an interactive web application using **R Shiny** in RStudio, encapsulating model loading, dynamic prediction generation, and interactive optimization controls.
* Deployed the full production app on **Shinyapps.io**, enabling real-time scenario simulation and web-based decision making.

---

## Key Challenges & Technical Insights

* **Transitioning from Python to R:** Migrated machine learning paradigms from Python/Scikit-Learn to R's specialized data science library ecosystem (`rminer`, `forecast`).
* **Time Series Backtesting:** Mastered time-aware evaluation strategies (rolling window backtesting) to properly measure model generalization without exposing future temporal information.
* **Predictive-to-Prescriptive Integration:** Successfully linked a predictive regression engine directly into a downstream optimization function, converting raw numbers into strategic marketing decisions.
* **End-to-End App Architecture:** Built and published a functional web UI and RESTful processing logic in R Shiny from scratch.