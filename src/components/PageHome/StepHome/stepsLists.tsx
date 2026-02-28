import { FiAperture, FiCheckCircle, FiGift, FiMessageSquare } from 'react-icons/fi';

import type { StepItemProps } from './interface';

export const steps: StepItemProps[] = [
  {
    id: 1,
    title: 'Responda algumas perguntas',
    description:
      'Conte-nos sobre a pessoa especial por meio de perguntas simples que revelam estilo, personalidade  e preferências.​',
    icon: <FiMessageSquare className="text-color-orange-10 w-5 h-5" />,
  },
  {
    id: 2,
    title: 'Análise personalizada',
    description:
      'Suas respostas passam por um processo inteligente que cruza estilo, preferências e contexto para gerar​ sugestões que realmente fazem sentido. ​',
    icon: <FiAperture className="text-color-orange-10 w-5 h-5" />,
  },
  {
    id: 3,
    title: 'Sugestões para escolher',
    description:
      'Você recebe opções que combinam com essa pessoa e pode comprar imediatamente, compartilhar ou manter a surpresa do presente.',
    icon: <FiGift className="text-color-orange-10 w-5 h-5" />,
  },
  {
    id: 4,
    title: 'A pessoa escolhe, você finaliza',
    description:
      'O presenteado escolhe a opção preferida e você recebe o acesso direto para concluir a compra com tranquilidade.',
    icon: <FiCheckCircle className="text-color-orange-10 w-5 h-5" />,
  },
];
