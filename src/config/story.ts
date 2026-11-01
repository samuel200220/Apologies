export interface StoryConfig {
  recipient: {
    name: string;
    nickname: string;
  };
  sender: {
    name: string;
    signature: string;
  };
  event: {
    symbolicDate: string;
    displayDate: string;
    time: string;
    eventName: string;
  };
  intro: {
    title: string;
    lead: string;
    cta: string;
  };
  timeTravel: {
    title: string;
    message: string;
    cta: string;
  };
  thatDay: {
    title: string;
    paragraphs: string[];
    cta: string;
  };
  letter: {
    header: string;
    salutation: string;
    paragraphs: string[];
    signoff: string;
    signature: string;
    cta: string;
  };
  finale: {
    question: string;
    ctaReveal: string;
    cinematicQuote: string;
    cardTitle: string;
    acceptButton: string;
    acceptMessage: string;
    ideasTitle: string;
    suggestedMoments: {
      id: string;
      title: string;
      description: string;
      icon: string;
    }[];
    gentleDeclineButton: string;
    gentleDeclineMessage: string;
  };
  assets: {
    images: {
      clock: string;
      rose: string;
      letterBg: string;
      parchment: string;
      petalsStream: string;
    };
    audio: {
      bgMusic: string;
      tick: string;
      rewind: string;
      envelopeOpen: string;
      chime: string;
    };
  };
}

export const STORY_CONFIG: StoryConfig = {
  recipient: {
    name: "Ivana",
    nickname: "Ivana",
  },
  sender: {
    name: "Samuel",
    signature: "Celui qui aurait aimé remonter le temps pour être à tes côtés.",
  },
  event: {
    symbolicDate: "25 Octobre 2026",
    displayDate: "Le jour de ton invitation",
    time: "20:00",
    eventName: "Ce moment que tu voulais partager avec moi",
  },
  intro: {
    title: "J'ai une petite histoire à te raconter…",
    lead: "Tu m'as demandé quelque chose que je ne peux malheureusement pas faire : remonter le temps. Mais si je pouvais le faire, je sais exactement ce que je changerais.",
    cta: "Entrer dans notre histoire",
  },
  timeTravel: {
    title: "Remonter le temps…",
    message:
      "Si je pouvais revenir à ce jour, je ferais les choses autrement. J'aurais anticipé, je me serais organisé différemment et j'aurais tout fait pour être à tes côtés.",
    cta: "Se souvenir de ce jour-là",
  },
  thatDay: {
    title: "Ce jour-là…",
    paragraphs: [
      "Tu avais pensé à moi en m'invitant. Tu avais envie de partager ce moment avec moi. J'avais accepté, et je comprends que mon absence ait pu te décevoir.",
      "Un empêchement technique est survenu et je ne m'en suis rendu compte que le jour même. Cela explique ce qui s'est passé, mais n'efface pas la déception que tu as pu ressentir.",
      "Je ne peux pas revivre cette journée, mais je peux reconnaître que j'aurais aimé être là.",
    ],
    cta: "Ouvrir la lettre que je t'ai écrite",
  },
  letter: {
    header: "À toi Ivana, qui méritais ma présence ce jour-là…",
    salutation: "Chère Ivana,",
    paragraphs: [
      "Je voudrais pouvoir remonter le temps, revenir à cette journée et faire en sorte que les choses se passent autrement.",
      "Tu m'avais invité à un événement, j'avais accepté, et je sais que tu comptais sur ma présence. Malheureusement, un empêchement technique est survenu le jour même, et je ne m'en suis rendu compte qu'à ce moment-là.",
      "Je sais que cela n'efface pas ma responsabilité ni la déception que tu as pu ressentir. Tu avais envie de partager ce moment avec moi, et je n'ai pas pu être là.",
      "Je suis sincèrement désolé.",
      "Je regrette de ne pas avoir pu t'accompagner, de ne pas avoir été présent dans ce moment que tu souhaitais partager avec moi. J'aurais aimé que cette journée se déroule autrement.",
      "Je ne vais pas te promettre que le passé changera, car je sais que c'est impossible. Mais je veux apprendre de cette situation, être plus prévoyant et accorder davantage d'attention aux moments que nous souhaitons partager ensemble.",
      "Je ne veux pas que mes excuses soient simplement de beaux mots. Je veux qu'elles se reflètent dans mes actes.",
      "Pardonne-moi de ne pas avoir été là. J'aurais vraiment aimé l'être.",
    ],
    signoff: "Avec toute mon amitié,",
    signature: "Celui qui aurait aimé remonter le temps pour être à tes côtés.",
    cta: "Découvrir la suite",
  },
  finale: {
    question:
      "Si le temps pouvait nous offrir une nouvelle occasion de partager un bon moment, accepterais-tu de m'en offrir une ?",
    ctaReveal: "Découvrir ma proposition",
    cinematicQuote:
      "Le passé ne m'appartient plus. Mais les efforts que je peux faire demain, eux, m'appartiennent.",
    cardTitle: "Et si nous partagions un vrai moment ensemble ? ✨",
    acceptButton: "Oui, avec plaisir !",
    acceptMessage:
      "Alors, cette fois, je veux être bien présent. Pour nous rattraper, j'ai pensé à deux options pour que l'on passe un super moment :",
    ideasTitle: "Lequel préfères-tu ?",
    suggestedMoments: [
      {
        id: "restaurant",
        title: "Un bon restaurant",
        description: "Une bonne table où nous pourrons bien manger, discuter tranquillement et rattraper le temps perdu. C'est moi qui régale !",
        icon: "Utensils",
      },
      {
        id: "walk",
        title: "Une agréable balade",
        description: "Prendre l'air, marcher tranquillement, changer d'ambiance et refaire le monde en toute simplicité.",
        icon: "Footprints",
      },
    ],
    gentleDeclineButton: "Pas maintenant, mais merci pour l'attention",
    gentleDeclineMessage:
      "Prends tout le temps dont tu as besoin, sans aucune pression. Mes excuses restent sincères. Sache que je serai ravi de partager ce moment dès que tu en auras l'envie ! ✨",
  },
  assets: {
    images: {
      clock: "/images/clock.jpeg",
      rose: "/images/rose.jpeg",
      letterBg: "/images/letter-bg.jpeg",
      parchment: "/images/parchment.jpeg",
      petalsStream: "/images/petals-stream.jpeg",
    },
    audio: {
      bgMusic: "/audio/music.mp3",
      tick: "/audio/tick.mp3",
      rewind: "/audio/rewind.mp3",
      envelopeOpen: "/audio/open-letter.mp3",
      chime: "/audio/chime.mp3",
    },
  },
};
