import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-full">
      <main>
        <div className="mx-auto my-10 flex max-w-4xl items-center justify-between p-4">
          <h1 className="text-center font-lato text-xl font-black md:text-2xl lg:text-3xl xl:text-4xl">
            Page d'accueil
          </h1>
          <Link
            href={"/add-member"}
            className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-xl border bg-primary px-4 py-2 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <PlusIcon className="size-4 text-primary-foreground" />
            <span className="font-lato font-semibold">Membre</span>
          </Link>
        </div>
        {/* <PersonsTable persons={JSON.parse(JSON.stringify(persons))} /> */}
      </main>
    </div>
  );
}

// ### **Section 1 : Hero Section**

// #### **a) Promesses courtes et impactantes**
// 1. **Simplifiez la gestion de votre église avec des outils pensés pour vous.**
// 2. **Recentrez-vous sur votre mission, nous nous occupons de l’organisation.**
// 3. **Connectez, suivez et faites grandir votre communauté spirituelle.**

// #### **b) Sous-promesses qui renforcent l’impact**
// 1. **Un logiciel complet, intuitif et sécurisé pour répondre à toutes les exigences d’une gestion moderne.**
// 2. **Gagnez du temps, améliorez la collaboration et suivez l’évolution spirituelle de vos membres en un seul endroit.**
// 3. **Découvrez des outils conçus pour vous aider à aligner vision spirituelle et croissance organisationnelle.**

// ---

// ### **Section 2 : Les 3 principaux bénéfices**

// #### **1. Une gestion simplifiée pour un impact décuplé**
// *Titre :* **Des outils intuitifs, adaptés à vos besoins.**
// *Texte :* Que vous soyez un pasteur, un responsable d’équipe ou un leader, ShepherdTools met à votre disposition une interface simple et accessible pour gérer efficacement vos membres, leurs parcours et leurs contributions. Simplifiez votre quotidien tout en gardant une vue d’ensemble.

// #### **2. Suivez la croissance spirituelle de vos membres**
// *Titre :* **Une vision claire de l’évolution individuelle et collective.**
// *Texte :* Suivez facilement les participations aux réunions, les étapes clés du cheminement spirituel et les engagements de chacun. Vous saurez toujours comment mieux accompagner vos membres.

// #### **3. Des rappels et notifications pour une organisation impeccable**
// *Titre :* **Plus jamais de tâches oubliées.**
// *Texte :* Grâce aux rappels automatisés et aux notifications, restez proactif dans la gestion des rendez-vous, des événements et des besoins de votre église. Nous nous chargeons des détails pour que vous puissiez vous concentrer sur l’essentiel.

// #### **4. Données sécurisées et confidentialité garantie**
// *Titre :* **Votre confiance est notre priorité.**
// *Texte :* Toutes les données de votre église et de vos membres sont stockées de manière sécurisée, avec un accès strictement contrôlé. ShepherdTools garantit le respect de votre vie privée et celle de votre communauté.

// #### **5. Une collaboration plus fluide entre les leaders**
// *Titre :* **Travaillez main dans la main avec vos équipes.**
// *Texte :* Affectez des responsabilités, suivez les missions et partagez facilement des informations pour renforcer l’engagement et la cohésion de votre équipe pastorale.

// #### **6. Un accompagnement personnalisé à chaque étape**
// *Titre :* **Nous sommes à vos côtés, toujours.**
// *Texte :* Bénéficiez d’un support dédié et d’une assistance continue pour vous aider à tirer le meilleur de ShepherdTools. Nous sommes là pour répondre à vos questions et optimiser votre utilisation.

// ---

// ### **Section 3 : Le process de travail avec nous**

// #### **Étape 1 : Découverte et démonstration gratuite**
// Prenez rendez-vous avec notre équipe pour découvrir ShepherdTools en action. Lors de cette rencontre, nous analysons vos besoins spécifiques et vous montrons comment notre solution peut transformer la gestion de votre église.

// #### **Étape 2 : Installation et configuration personnalisée**
// Nous mettons en place ShepherdTools en fonction des besoins uniques de votre communauté. De la configuration initiale à la migration de vos données existantes, nous nous occupons de tout pour un démarrage sans stress.

// #### **Étape 3 : Formation et accompagnement continu**
// Nous formons vos équipes pour garantir une adoption rapide et fluide de l’outil. Par la suite, notre support reste disponible pour répondre à vos questions et vous accompagner dans l’optimisation de votre utilisation.

// ---

// ### **Section 4 : Pourquoi travailler avec nous ?**

// #### **1. Une solution pensée par des experts du ministère**
// Nous comprenons les défis que rencontrent les responsables d’églises, car nous avons conçu ShepherdTools avec eux en tête. Notre logiciel répond aux besoins réels de votre mission.

// #### **2. Un gain de temps précieux pour vous concentrer sur l’essentiel**
// En optimisant vos processus organisationnels, ShepherdTools vous libère du temps pour vous concentrer sur votre vocation et votre communauté.

// #### **3. Une interface intuitive, accessible à tous**
// Pas besoin d’être un expert en technologie pour utiliser ShepherdTools. Notre solution a été conçue pour être simple, pratique et agréable à utiliser, quelle que soit votre expérience.

// #### **4. Un service client bienveillant et réactif**
// Votre satisfaction est notre priorité. Notre équipe est disponible pour vous accompagner à chaque étape et s’assurer que vous tirez le meilleur parti de ShepherdTools.

// #### **5. Une solution évolutive et flexible**
// ShepherdTools grandit avec vous. Que votre église soit petite ou en pleine expansion, notre logiciel s’adapte à vos besoins actuels et futurs.

// #### **6. Une approche centrée sur votre mission spirituelle**
// Nous croyons en l’importance de votre travail. ShepherdTools n’est pas juste un logiciel ; c’est un partenaire qui vous aide à aligner votre vision spirituelle avec une gestion efficace et moderne.

// ---

// Avec ce texte, vous aurez une page d’accueil qui capte l’attention, rassure vos visiteurs et leur donne envie de collaborer avec ShepherdTools. 😊

// ### **Section 1 : Hero Section**

// #### **a) Promesses courtes et impactantes**
// 1. **Dites adieu aux imprévus et aux oublis dans la gestion de votre église.**
// 2. **Transformez votre organisation pour mieux servir votre communauté.**
// 3. **Un outil conçu pour répondre aux défis quotidiens des églises modernes.**

// #### **b) Sous-promesses centrées sur la résolution des problèmes**
// 1. **Simplifiez la gestion des membres et concentrez-vous sur leur accompagnement spirituel.**
// 2. **Fini les pertes de temps et les désorganisations : centralisez toutes vos données au même endroit.**
// 3. **Restez informé, organisé et aligné avec les besoins de votre communauté.**

// ---

// ### **Section 2 : Les 3 principaux bénéfices**

// #### **1. Libérez-vous des tâches administratives chronophages**
// *Titre :* **Automatisation des tâches répétitives.**
// *Texte :* ShepherdTools gère pour vous les rappels, les suivis et les rapports, réduisant ainsi le temps passé sur des tâches administratives. Moins de paperasse, plus de temps pour votre mission spirituelle.

// #### **2. Maîtrisez l’évolution spirituelle de vos membres**
// *Titre :* **Un suivi personnalisé à portée de clic.**
// *Texte :* Ne perdez plus de vue où en sont vos membres dans leur cheminement. Identifiez les besoins, suivez les étapes clés et offrez un accompagnement spirituel adapté à chacun.

// #### **3. Évitez les malentendus et les doublons dans vos équipes**
// *Titre :* **Coordination fluide et efficace.**
// *Texte :* Assurez une communication claire entre les différents responsables grâce à un espace de collaboration centralisé. Plus de confusions, chaque leader sait ce qu’il doit faire.

// #### **4. Réduisez le stress des événements et des plannings**
// *Titre :* **Une organisation simplifiée des activités.**
// *Texte :* Planifiez vos réunions, événements et services sans crainte d’oublis ou de chevauchements. ShepherdTools vous aide à maintenir une organisation impeccable.

// #### **5. Protégez les données sensibles de votre église**
// *Titre :* **Sécurité et confidentialité assurées.**
// *Texte :* Vos membres vous font confiance avec leurs informations. ShepherdTools garantit la sécurité de vos données avec des protocoles avancés pour protéger leur confidentialité.

// #### **6. Soyez prêt pour aujourd’hui et pour l’avenir**
// *Titre :* **Une solution évolutive.**
// *Texte :* Que vous gériez une petite église ou une communauté en pleine croissance, ShepherdTools s’adapte à vos besoins actuels et futurs pour accompagner votre expansion.

// ---

// ### **Section 3 : Le process de travail avec nous**

// #### **Étape 1 : Comprendre vos défis**
// Nous débutons par un échange pour identifier les problèmes spécifiques que vous rencontrez : désorganisation, suivi des membres, gestion des équipes ou planification des événements. Nous personnalisons la démonstration pour répondre à vos besoins.

// #### **Étape 2 : Une transition fluide**
// Nous nous chargeons de l’installation, de la configuration et de la migration de vos données existantes, en veillant à minimiser les interruptions. Vous êtes opérationnel dès le premier jour.

// #### **Étape 3 : Assistance et formation continue**
// Nous formons vos équipes et restons disponibles pour résoudre vos questions. Que vous ayez besoin d’ajuster un processus ou de maximiser l’utilisation de nos outils, notre équipe est là pour vous.

// ---

// ### **Section 4 : Pourquoi travailler avec nous ?**

// #### **1. Nous résolvons vos frustrations quotidiennes**
// Vous en avez assez des erreurs de communication, des plannings mal tenus ou du manque de visibilité sur vos membres ? ShepherdTools transforme vos défis en solutions durables.

// #### **2. Un outil fait pour les églises, pas pour les entreprises**
// Contrairement aux logiciels génériques, ShepherdTools est conçu pour répondre aux spécificités du ministère : suivi spirituel, gestion des bénévoles et des événements, le tout dans un esprit d’accompagnement.

// #### **3. Une adoption simple, sans prise de tête**
// Nous savons que la technologie peut être intimidante. C’est pourquoi nous avons conçu une solution intuitive, accompagnée d’une formation claire pour votre équipe.

// #### **4. Un soutien qui ne vous abandonne jamais**
// Votre réussite est notre priorité. De l’installation au support continu, nous sommes à vos côtés pour garantir que ShepherdTools répond parfaitement à vos attentes.

// #### **5. Une solution adaptée à votre budget**
// Nous croyons que chaque église, quelle que soit sa taille, mérite des outils modernes. Nos plans tarifaires sont flexibles pour s’adapter à vos réalités financières.

// #### **6. Parce que votre mission compte**
// Vous œuvrez pour le bien-être spirituel de vos membres. Nous œuvrons pour vous aider à accomplir cette mission sans les fardeaux de la désorganisation.

// ---

// Cette nouvelle version aborde directement les frustrations et les besoins de vos prospects pour les convaincre que ShepherdTools est l’allié qu’ils recherchent. 😊
