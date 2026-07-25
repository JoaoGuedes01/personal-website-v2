---
title: "ESRB Predictor"
summary: "App that can accurately predict the ESRB Rating of a video game based on its content flags."
type: "Academic"
category: "Data Science & ML"
stack: ["Python", "Scikit Learn", "MySQL", "Tableau", "Flask", "Jupyter"]
featured: false
resume: false
order: 86
draft: false
org: "University of Minho"
orgUrl: "https://www.uminho.pt/"
repo: "https://github.com/JoaoGuedes01/ESRB_Rating_Predictor_CRISPDM"
demo: "https://github.com/JoaoGuedes01/ESRB_Rating_Predictor_CRISPDM/blob/main/jupyter-notebooks/esrb-rating-notebook.ipynb"
year: 2022
gallery:
  - { src: ./img/esrb-predictor/cover.png, alt: "Cover Image", caption: "The ESRB Predictor cover image." }
  - { src: ./img/esrb-predictor/input.png, alt: "Input Image", caption: "Data Input for prediction model interface." }
  - { src: ./img/esrb-predictor/result.png, alt: "Result Image", caption: "Prediction result for the new game." }
  - { src: ./img/esrb-predictor/cost-dash.png, alt: "Cost Dashboard Image", caption: "Dashboard regarding costs." }
  - { src: ./img/esrb-predictor/pred-dash.png, alt: "Prediction Dashboard Image", caption: "Dashboard regarding model predictions." }
---

> ⚠️ **Demo Offline:** Due to recent Heroku pricing changes, the ESRB Predictor demo link is currently inactive. We plan to redeploy the demo to a new hosting platform soon. For now the link leads to the model training notebook

## Overview

Developed for the *Machine Learning in Enterprise Systems* course in a team of three, **ESRB Predictor** is an end-to-end machine learning project designed to accurately classify and predict ESRB content ratings for video games based on content flags (such as violence, blood, or suggestive themes).

Following the **CRISP-DM** (Cross-Industry Standard Process for Data Mining) framework, the project encompassed the full lifecycle: business understanding, exploratory data analysis (EDA), data pre-processing, model training, hyperparameter tuning, cross-validation, data warehousing, and web deployment.

## Methodology & Machine Learning Pipeline

*   **CRISP-DM & Scenario Testing:** Divided the dataset into controlled experimentation scenarios (evaluating outlier removal vs. retention and feature engineering like release dates). Scenario 2 (outliers removed) yielded the highest baseline performance.
*   **Model Selection & Hyperparameter Tuning:** Trained and evaluated over 10 distinct classification algorithms using **Scikit-Learn**. Used **Grid Search** to fine-tune model hyperparameters for optimal performance.
*   **Cross-Validation:** Executed stratified cross-validation across all scenarios to ensure robust model generalization and prevent overfitting.
*   **Data Warehousing & BI Dashboards:** Stored cross-validation metrics, model evaluations, and hyperparameter results in a dedicated **MySQL Data Warehouse**, pairing it with interactive **Tableau** dashboards for visual performance comparison.

## Web Application & Deployment

To make the predictive engine accessible to end users, a web interface was built using HTML/CSS and served via a **Flask** backend. The application was deployed to a **Heroku** instance, allowing users to input content descriptors and receive real-time rating predictions from the top-performing ML model.

## Challenges & Key Learnings

*   **End-to-End ML Pipeline:** Mastered exploratory data analysis, feature engineering, scenario testing, and model validation using Python's data science ecosystem.
*   **Hyperparameter Optimization & Validation:** Gained practical experience with Grid Search and Cross-Validation techniques to select and refine optimal classification models.
*   **Full-Stack Integration & Analytics:** Successfully integrated a trained machine learning model into a web interface while establishing structured evaluation data warehousing in MySQL and Tableau, completing the course with a 19/20 grade.