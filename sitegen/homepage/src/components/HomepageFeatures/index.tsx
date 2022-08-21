import React from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Manage Your Recipes',
    Svg: require('@site/static/img/books-icon.svg').default,
    description: (
      <>
        Store and browse your recipe collection from any device, filter by tags or use text search
      </>
    ),
  },
  {
    title: 'FOSS and Easy to Self Host',
    Svg: require('@site/static/img/open-source-icon.svg').default,
    description: (
      <>
        Licensed under GPLv3, no tracking or ads, easy to self host on a VPS or Raspberry Pi
      </>
    ),
  },
  {
    title: 'Modern UI',
    Svg: require('@site/static/img/devices-icon.svg').default,
    description: (
      <>
        Easy handling on any screensize, dark/light themes, no cluttered UI or annoying ads
      </>
    ),
  },
  {
    title: 'Multi User',
    Svg: require('@site/static/img/users-icon.svg').default,
    description: (
      <>
        Have multiple users on the same instance, use Github or Google account to login
      </>
    ),
  },
  {
    title: 'One Click Publish',
    Svg: require('@site/static/img/share-icon.svg').default,
    description: (
      <>
        Select recipes to publish on a static site for easy sharing
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className="feature-item">
      <div className="feature-image">
        <Svg width="64" height="64" strokeWidth="1.5" role="img" />
      </div>
      <div>
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
