import React from 'react';
import ThemedImage from '@theme/ThemedImage';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="header">
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs">
            Getting started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/balzss/konyha-recipe-manager">
            Github
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container" style={{margin: '4rem auto'}}>
          <section className="section">
            <h2>Screenshots</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem'}}>
              <div>
                <ThemedImage
                  sources={{
                    light: require('@site/static/img/screenshot-manager-home-light.png').default,
                    dark: require('@site/static/img/screenshot-manager-home.png').default,
                  }}
                />
                <div className="caption">Home page</div>
              </div>
              <div>
                <ThemedImage
                  sources={{
                    light: require('@site/static/img/screenshot-manager-details-light.png').default,
                    dark: require('@site/static/img/screenshot-manager-details.png').default,
                  }}
                />
                <div className="caption">Recipe details</div>
              </div>
              <div>
                <ThemedImage
                  sources={{
                    light: require('@site/static/img/screenshot-manager-edit-light.png').default,
                    dark: require('@site/static/img/screenshot-manager-edit.png').default,
                  }}
                />
                <div className="caption">Edit page</div>
              </div>
            </div>
          </section>
          <section className="section">
            <h2>Static site generator</h2>
            <p>
              There is a <a href="/demo">demo site</a> generated from <a href="/demo.json">this json</a> file and is identical 
              to the output of the site generator in Konyha.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}
