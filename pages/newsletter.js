import Head from 'next/head';
import NewsletterForm from '../components/NewsletterForm/NewsletterForm';
import Styles from '../styles/newsletter.module.css';
import Link from 'next/link';
import { getNewsletterList } from './api/get/newsletterlist';

export default function Newsletter({ newsletterList }) {
  return (
    <>
      <Head>
        <title>H Society - Newsletter</title>
      </Head>
      <main className={Styles.container}>
        <div className={Styles.listContainer}>
          <div className={Styles.heading}>Available Newsletters</div>
          {newsletterList.length != 0 ? (
            <ul className={Styles.list}>
              {newsletterList.map((newsletter, i) => {
                return (
                  <Link key={i} href={`/newsletter/${i + 1}`}>
                    <li>
                      <a>{newsletter}</a>
                    </li>
                  </Link>
                );
              })}
            </ul>
          ) : (
            <div className={Styles.emptyList}>No Newsletter Available!</div>
          )}
        </div>
        <div className={Styles.newsletterForm}>
          <NewsletterForm />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    let values = await getNewsletterList();
    values = values.map((value) => value[0]);

    return {
      props: {
        newsletterList: values,
      },
      revalidate: 20,
    };
  } catch (e) {
    console.log(e.message);
    return {
      props: {
        newsletterList: [],
      },
      revalidate: 20,
    };
  }
}
