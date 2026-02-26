import { ServiceWedoHome } from './interface';

// Icons:
import { IoShareSocialOutline } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa6';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Icon } from '@iconify/react';

export const servicesWedoHome: ServiceWedoHome[] = [
  {
    id: 1,
    name: 'Responda algumas perguntas',
    icon: (
      <div className="w-8 h-8 bg-color-red-10 text-white rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon icon="ph:chat-text-light" width="22" />
      </div>
    ),
    description:
      'Conte um pouco sobre quem vai receber o presente. Com respostas rápidas, já conseguimos entender o que combina com essa pessoa.​',
    image: {
      url: '/hero-home-images/wedo-images/responda-perguntas.png',
      alt: 'Imagem Responda perguntas',
      width: 450,
      height: 450,
    },
  },
  {
    id: 2,
    name: 'Sugestões geradas com IA e MBTI',
    icon: (
      <div className="w-8 h-8 bg-color-red-10 text-white rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon icon="ph:gift-light" width="22" />
      </div>
    ),
    description:
      'Com base nas suas respostas, usamos inteligência artificial e MBTI (veja  o que é na fac) para entender o perfil da pessoa e sugerir presentes que realmente combinam com ela.​',
    image: {
      url: '/hero-home-images/wedo-images/lista-de-presentes.png',
      alt: 'Imagem Lista de presentes',
      width: 450,
      height: 450,
    },
  },
  {
    id: 3,
    name: 'Compartilhe a lista​',
    icon: (
      <div className="w-8 h-8 bg-color-red-10 text-white rounded-lg flex items-center justify-center flex-shrink-0">
        <IoShareSocialOutline size={20} />
      </div>
    ),
    description:
      'Com a lista pronta, você pode comprar direto, compartilhar com o presenteado ou enviar apenas dicas para manter a surpresa.​',
    image: {
      url: '/hero-home-images/wedo-images/lista-para-presenteado.png',
      alt: 'Imagem Envie lista',
      width: 450,
      height: 450,
    },
  },

  {
    id: 4,
    name: 'Decida o que o presenteado verá',
    icon: (
      <div className="w-8 h-8 bg-color-red-10 rounded-lg flex items-center justify-center flex-shrink-0">
        <FaRegEye className="text-white" size={20} />
      </div>
    ),
    description:
      'Você decide se o presenteado receberá a lista exibindo os presentes, apenas dicas elaboradas pela IA ou informadas por você  –  assim, a surpresa pode ser mantida até o final.',
    image: {
      url: '/hero-home-images/wedo-images/controle-oq-presenteado-vera.png',
      alt: 'Imagem Controle',
      width: 450,
      height: 450,
    },
  },
  {
    id: 5,
    name: 'Acompanhe a escolha e finalize a compra',
    icon: (
      <div className="w-8 h-8 bg-color-red-10 rounded-lg flex items-center justify-center flex-shrink-0">
        <AiOutlineShoppingCart className="text-white" size={20} />
      </div>
    ),
    description:
      'Quando o presenteado escolhe o favorito, você recebe o acesso direto para concluir a compra com segurança no site do parceiro.',
    image: {
      url: '/hero-home-images/wedo-images/descubra-a-comra.png',
      alt: 'Imagem Finalize compra',
      width: 450,
      height: 450,
    },
  },
];
