export interface schemeProps {
  name: string,
  description: string,
  link: string,
  image: any,
}

export const Hindi = [
  {
    name: "प्रधानमंत्री गरीब कल्याण अन्न योजना",
    description: "कोविड-19 जैसी आपातकालीन परिस्थितियों में गरीब परिवारों को मुफ्त खाद्यान्न उपलब्ध कराने की योजना।",
    link: "https://dfpd.gov.in/Home/ContentManagement?Url=pmgka.html&ManuId=3&language=2",
    image: require('@/assets/images/PMHKAY.jpeg'),
  },
  {
    name: "प्रधानमंत्री जनजातीय उन्नत ग्राम अभियान",
    description: "जनजातीय समुदायों की सामाजिक-आर्थिक स्थिति में सुधार लाने हेतु 63,000 गांवों को कवर करने वाली योजना।",
    link: "https://tribal.cg.gov.in/%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A7%E0%A4%BE%E0%A4%A8%E0%A4%AE%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80-%E0%A4%9C%E0%A4%A8%E0%A4%9C%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%AF-%E0%A4%89%E0%A4%A8%E0%A5%8D%E0%A4%A8%E0%A4%A4-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE-%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%A8",
    image: require('@/assets/images/PMJUGA.jpeg'),
  },
  {
    name: "सूक्ष्म, लघु और मध्यम उद्यमों (MSMEs) के लिए क्रेडिट गारंटी योजना",
    description: "एमएसएमई को मशीनरी खरीदने और वित्तीय संकट के दौरान संचालन बनाए रखने के लिए बिना गारंटी के ऋण प्रदान करने की योजना।",
    link: "https://tribal.cg.gov.in/me",
    image: require('@/assets/images/CGTMSE.jpeg'),
  },
  {
    name: "रोजगार से जुड़ी प्रोत्साहन योजनाएँ",
    description: "पहली बार नौकरी पाने वाले कर्मचारियों और नियोक्ताओं को वित्तीय प्रोत्साहन देकर नौकरी सृजन को बढ़ावा देने की योजना।",
    link: "https://cleartax.in/s/employment-linked-incentive-scheme",
    image: require('@/assets/images/ELIS.jpeg'),
  },
  {
    name: "प्रधानमंत्री ग्राम सड़क योजना",
    description: "ग्रामीण क्षेत्रों में सभी मौसम में सड़क कनेक्टिविटी प्रदान करने की योजना।",
    link: "https://pmgsy.nic.in/hi",
    image: require('@/assets/images/PGSY.jpeg'),
  }
]

export const English = [
  {
    name: "Pradhan Mantri Garib Kalyan Anna Yojana",
    description: "A scheme that provides free food grains to poor households during crises like the COVID-19 pandemic.",
    link: "https://dfpd.gov.in/Home/ContentManagement?Url=pmgka.html&ManuId=3&language=1",
    image: require('@/assets/images/PMHKAY.jpeg'),
  },
  {
    name: "Pradhan Mantri Janjatiya Unnat Gram Abhiyan",
    description: "A program aimed at improving the socio-economic conditions of tribal families by covering 63,000 villages.",
    link: "https://tribal.cg.gov.in/%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A7%E0%A4%BE%E0%A4%A8%E0%A4%AE%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80-%E0%A4%9C%E0%A4%A8%E0%A4%9C%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%AF-%E0%A4%89%E0%A4%A8%E0%A5%8D%E0%A4%A8%E0%A4%A4-%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE-%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%A8",
    image: require('@/assets/images/PMJUGA.jpeg'),
  },
  {
    name: "Credit Guarantee Scheme for MSMEs",
    description: "A scheme offering collateral-free loans to MSMEs for purchasing machinery and maintaining operations during financial stress.",
    link: "https://tribal.cg.gov.in/en",
    image: require('@/assets/images/CGTMSE.jpeg'),
  },
  {
    name: "Employment Linked Incentive Schemes",
    description: "This scheme encourages job creation by offering financial incentives to first-time employees and employers.",
    link: "https://cleartax.in/s/employment-linked-incentive-scheme",
    image: require('@/assets/images/ELIS.jpeg'),
  },
  {
    name: "Pradhan Mantri Gram Sadak Yojana",
    description: "A scheme to provide all-weather road connectivity to rural areas in India.",
    link: "https://pmgsy.nic.in/",
    image: require('@/assets/images/PGSY.jpeg'),
  }
]
