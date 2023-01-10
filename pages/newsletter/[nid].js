import Styles from '../../styles/[nid].module.css';
import NewsletterForm from '../../components/NewsletterForm/NewsletterForm';
import { getNewsletterValues } from '../api/get/newsletters';
import { getNewsletterList } from '../api/get/newsletterlist';

export default function NewsLetter({ newsletters }) {
  return (
    <>
      <main className={Styles.container}>
        <div className={Styles.newsletter}>
          <h1 className={Styles.title}>{newsletters[0]}</h1>
          <p className={Styles.para}>{newsletters[1]}</p>
        </div>
        <div className={Styles.newsletterForm}>
          <NewsletterForm />
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  try {
    let values = await getNewsletterList();

    values = values.map((value) => value[0]);
    const paths = values.map((value, i) => {
      return {
        params: { nid: `${i + 1}` },
      };
    });

    return { paths, fallback: 'blocking' };
  } catch (e) {
    console.log(e.message);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const nid = parseInt(params.nid) + 1;
    const values = await getNewsletterValues(nid);
    const newsletters = values[0];

    if (newsletters.length == 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        newsletters,
      },

      revalidate: 20,
    };
  } catch (e) {
    console.log(e.message);
    return {
      notFound: true,
    };
  }
}
