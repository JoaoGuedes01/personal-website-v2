---
title: "Titanic Kaggle"
summary: "Data Science project focused on studying and relating the features of the people aboard the titanic and their probability of death"
type: "Personal"
category: "Data Science & ML"
stack: ["Python", "Pandas", "Jupyter Notebooks"]
featured: false
resume: false
order: 93
draft: false
repo: "https://github.com/JoaoGuedes01/Titanic_DS"
year: 2021
gallery:
  - { src: ./img/titanic-kaggle/cover.png, alt: "Cover Image", caption: "Titanic Challenge Cover Image." }
  - { src: ./img/titanic-kaggle/data.png, alt: "Data Image", caption: "The challenge data overview." }
  - { src: ./img/titanic-kaggle/data-table.png, alt: "Data Table Image", caption: "The challenge dataset." }
  - { src: ./img/titanic-kaggle/eda-overview.png, alt: "EDA Overview Image", caption: "Numerical data overview." }
  - { src: ./img/titanic-kaggle/correlations.png, alt: "Correlations Image", caption: "Data correlations overview." }
  - { src: ./img/titanic-kaggle/model-code.png, alt: "Model Code Image", caption: "ML model code snippet." }
  - { src: ./img/titanic-kaggle/submission.png, alt: "Submission Image", caption: "Submission to kaggle and classification." }
---

## Overview

Designed as a self-directed head start prior to taking formal university machine learning courses, this project tackles Kaggle's iconic **Titanic: Machine Learning from Disaster** competition. The primary goal was to build a binary classification pipeline to predict passenger survival based on demographic, ticket, and location features.

As my first hands-on entry into Data Science, the project bridged pure software engineering with statistical inference, providing direct experience with exploratory data analysis, feature handling, and model optimization workflows.

## ML Pipeline & Workflow

The project followed standard end-to-end data science practices structured inside interactive **Jupyter Notebooks**:

*   **Data Preprocessing & Cleaning:** Inspected dataset feature distributions, handled missing values across fields (such as age and cabin data), and encoded categorical variables for tabular model ingestion using **Pandas** and **NumPy**.
*   **Model Evaluation & Cross-Validation:** Trained and evaluated multiple classification models, leveraging K-Fold cross-validation to ensure reliable accuracy estimates and guard against overfitting on the training set.
*   **Hyperparameter Optimization:** Utilized **Grid Search** (`GridSearchCV`) via **Scikit-Learn** to systematically sweep parameter combinations, identifying optimal configurations to maximize model performance.
*   **Submission & Leaderboard:** Exported final test predictions to Kaggle, achieving a **75% accuracy score** on my first official competition submission.

## Key Learnings & Retrospective

Building this model demystified core machine learning concepts and fundamentally shifted how I approached data-driven problems:

1.  **Connecting Code to Statistics:** The project clearly demonstrated the deep connection between software engineering and statistical mechanics. Watching prediction scores improve through iterative data transformations made abstract concepts concrete.
2.  **Navigating Open-Ended Workflows:** Unlike deterministic software where logic follows strict paths, data science required adapting to an exploratory mindset where there is rarely a single "correct" way to engineer features or select models.
3.  **Foundation for Academic Success:** Mastering hyperparameter tuning, cross-validation, and data cleaning beforehand provided a massive head start for subsequent university coursework in Machine Learning and Data Science.