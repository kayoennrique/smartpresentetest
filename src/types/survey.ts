export type ContactResponsible = "PLATFORM" | "CLIENT";

export type SurveyAnswers = {
  "rq-tipo_presenteado"?: string;
  "rq-faixa_etaria"?: string;
  "rq-interesse"?: string;
  "rq-estilo_vida"?: string[];
  "rq-personalidade"?: string[];
  "rq-mbti"?: string;
  "rq-ocasiao"?: string;
  "rq-mini"?: string;
  "rq-max"?: string;
  "rq-lista_presente"?: ContactResponsible;
  "rq-de"?: string;
  "rq-para"?: string;
};
