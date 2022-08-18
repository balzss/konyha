import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  img: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'FOSS and Easy to Self Host',
    img: require('@site/static/img/open-source-icon.png').default,
    description: (
      <>
        Licensed under GPLv3, no tracking or ads, easy to self host on a VPS, Raspberry Pi, etc
      </>
    ),
  },
  {
    title: 'Manage Your Recipe Collection',
    img: require('@site/static/img/cookbook-icon.png').default,
    description: (
      <>
        Store and browse your recipe collection from any device, filter by tags or use text search
      </>
    ),
  },
  {
    title: 'Multi User',
    img: require('@site/static/img/multi-user-icon.png').default,
    description: (
      <>
        Have multiple users on the same instance, use Github or Google account to login
      </>
    ),
  },
  {
    title: 'Modern UI',
    img: require('@site/static/img/ui-icon.png').default,
    description: (
      <>
        Easy handling on any screensize, dark/light themes, no cluttered UI or annoying ads
      </>
    ),
  },
  {
    title: 'One Click Publish',
    img: require('@site/static/img/publish-icon.png').default,
    description: (
      <>
        Select recipes to publish on a static site for easy sharing
      </>
    ),
  },
];

function Feature({title, img, description}: FeatureItem) {
  return (
    <div className="feature-item">
      <div className="feature-image">
        <img src={img} alt="" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="feature-grid">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
