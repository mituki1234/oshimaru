import styles from "./page.module.css";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import Head from "next/head";
import { MdOutlineShoppingBag, MdOutlineEvent, MdOutlineSportsHandball, MdOutlineWorkOutline } from "react-icons/md";

export default function Top() {
    return (
        <>
            <Head>
                <meta name="description" content="おしまるとは、スーパーなどにあるチラシなどを電子化し、申請したら全て見られるようにすることです。" />
                <meta name="keywords" content="ポスター、チラシ、大島、イベント、習い事、サークル、チーム、趣味、求人、買い物、お買い物、おしまる" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="大島情報局、略しておしまる。" />
                <meta property="og:description" content="おしまるとは、大島の情報（ポスター)などを集めたサービスです。" />
            </Head>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <div className={styles.menu}>
                        <div className={styles.menuItem}>
                            <Link href="/#お買い物情報、キャンペーン">お買い物</Link>
                        </div>
                        <div className={styles.menuItem}>
                            <Link href="/#イベント情報">イベント</Link>
                        </div>
                        <div className={styles.menuItem}>
                            <Link href="/#趣味、習い事">サークル</Link>
                        </div>
                        <div className={styles.menuItem}>
                            <Link href="/#求人情報">求人</Link>
                        </div>
                        <div className={styles.menuItem}>
                            <Link href="/top" className={styles.homeLink}>
                                <IoMdHome size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.heroSection}>
                        <h1 className={styles.title}>おしまる</h1>
                        <p className={styles.subtitle}>伊豆大島の暮らしをもっと便利に、もっと楽しく</p>
                    </div>

                    <div className={styles.cardsContainer}>
                        <Link href="/#お買い物情報、キャンペーン" className={styles.card}>
                            <h3>お買い物情報</h3>
                            <div className={styles.cardContent}>
                                <MdOutlineShoppingBag className={styles.cardIcon} size={48} />
                                <p>お得な情報やキャンペーンをチェック</p>
                            </div>
                        </Link>
                        <Link href="/#イベント情報" className={styles.card}>
                            <h3>イベント情報</h3>
                            <div className={styles.cardContent}>
                                <MdOutlineEvent className={styles.cardIcon} size={48} />
                                <p>島内の様々なイベント情報を確認</p>
                            </div>
                        </Link>
                        <Link href="/#趣味、習い事" className={styles.card}>
                            <h3>趣味・サークル</h3>
                            <div className={styles.cardContent}>
                                <MdOutlineSportsHandball className={styles.cardIcon} size={48} />
                                <p>新しい趣味や仲間との出会い</p>
                            </div>
                        </Link>
                        <Link href="/#求人情報" className={styles.card}>
                            <h3>求人情報</h3>
                            <div className={styles.cardContent}>
                                <MdOutlineWorkOutline className={styles.cardIcon} size={48} />
                                <p>島内のお仕事情報をご紹介</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}