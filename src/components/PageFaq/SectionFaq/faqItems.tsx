import type { FaqItem } from '../interfaces';

export type TabId = 'comofunciona' | 'listas' | 'presente' | 'parcerias';

export const faqByTab: Record<TabId, FaqItem[]> = {
  comofunciona: [
    {
      title: 'O que é o Smartpresente?​',
      content:
        'O Smartpresente é uma plataforma que ajuda você a escolher o presente certo.​ Com algumas respostas rápidas, usamos inteligência artificial e MBTI para entender o perfil da pessoa e sugerir opções que realmente combinam com ela.',
    },
    {
      title: 'A plataforma analisa redes sociais?​',
      content:
        'Não. Hoje o Smartpresente utiliza apenas as informações informadas na plataforma.​ Estamos desenvolvendo uma nova versão que vai integrar redes sociais de forma opcional, com autorização prévia e em total conformidade com a LGPD.',
    },
    {
      title: 'Como a inteligência artificial escolhe os presentes?',
      content:
        'A inteligência artificial analisa suas respostas sobre a pessoa, considera o perfil comportamental (incluindo MBTI) e identifica sugestões que fazem sentido para o estilo, interesses e momento dela.',
    },
    {
      title: 'O que é MBTI?',
      content:
        'MBTI (Indicador de Tipo Myers-Briggs) é um modelo de personalidade utilizado no mundo todo para compreender preferências, forma de decisão e estilo de interação das pessoas.​ Ele organiza os perfis em 16 tipos: o empreendedor, o inspirador, o protagonista, o provedor, o cuidador, o conselheiro, o sonhador, o animador, o analista, o artista,  o comandante, o inventor, o executivo, o arquiteto, o inspetor, o técnico, ajudando a identificar padrões de comportamento e o que tende a combinar melhor com cada pessoa.',
    },
    {
      title: 'Como o MBTI é usado pelo Smartpresente?',
      content:
        'No Smartpresente, usamos o MBTI como parte do processo para entender preferências e estilo da pessoa. Com base nisso — e nas suas respostas — a inteligência artificial sugere presentes que combinam mais com o perfil dela.',
    },
    {
      title: 'O Smartpresente vende os presentes diretamente?',
      content:
        'Não. O Smartpresente não realiza vendas diretas. O presenteado escolhe a opção preferida e, depois disso, você é direcionado para o site do parceiro para concluir a compra com segurança.',
    },
    {
      title: 'O uso da plataforma é gratuito?',
      content:
        'Sim. Usar o Smartpresente é gratuito. O  Você paga apenas pelo presente escolhido, diretamente no site do parceiro. Todo o resto é por nossa conta.',
    },
    {
      title: 'O Smartpresente funciona para todas as idades?',
      content:
        'Hoje a plataforma atende pessoas a partir de 14 anos. Já estamos evoluindo para incluir também idades menores com recomendações precisas.',
    },
    {
      title: 'As sugestões de presentes são sempre confiáveis?',
      content:
        'Sim. As sugestões levam em conta suas respostas, o perfil da pessoa e inteligência artificial para indicar opções que tenham mais chance de agradar.',
    },
    {
      title: 'Posso escolher quanto quero gastar no presente?',
      content:
        '​Sim. Você define a faixa de valor e as sugestões já aparecem dentro desse orçamento.',
    },
  ],

  listas: [
    {
      title: 'As listas de sugestões mudam conforme as respostas?',
      content:
        'Sim. Cada resposta altera o perfil analisado pela IA. Por isso, as listas de sugestões são sempre dinâmicas e adaptadas ao estilo de cada pessoa.',
    },
    {
      title: 'As sugestões da lista são atualizadas automaticamente?',
      content:
        'Sim. Sempre que você refizer o perfil do presenteado ou ajustar as respostas, a IA atualiza as sugestões automaticamente. Isso garante listas mais precisas e alinhadas ao momento atual. Lembre-se apenas que preço e disponibilidade dependem dos lojistas parceiros.',
    },
    {
      title: 'Posso criar minhas próprias listas de presentes?',
      content:
        'Não. As listas são geradas automaticamente pela plataforma, com base nas informações que você fornece sobre a pessoa.',
    },
    {
      title: 'Por quanto tempo minhas listas ficam disponíveis na área logada?',
      content:
        '​As listas ficam disponíveis por um período de até 3 meses na sua área logada. Após esse prazo, elas são removidas automaticamente. Se precisar, você pode gerar novas listas a qualquer momento.',
    },
    {
      title: 'Como faço para editar uma lista depois de criada?',
      content:
        'No momento, as listas não podem ser editadas.​ Você pode acessá-las na sua área logada para visualizar e acompanhar as escolhas. Se quiser outras opções, é só gerar uma nova lista — você pode criar quantas precisar.',
    },
    {
      title: 'Posso acessar minhas listas depois de enviá-las?',
      content:
        'Sim. As listas enviadas ficam disponíveis na sua área logada.​ Lá você pode acompanhar qual presente foi escolhido e acessar o link do lojista para concluir a compra com praticidade.',
    },
    {
      title: 'Posso manter o presente como surpresa?',
      content:
        'Sim. Você controla totalmente o que o presenteado verá. É possível enviar a lista completa, apenas as dicas geradas pela IA ou incluir suas próprias pistas, mantendo o presente como surpresa até o final.',
    },
  ],

  presente: [
    {
      title: 'Como funciona a escolha do presente?',
      content:
        'O presenteado recebe um link por WhatsApp para acessar a lista de sugestões.​ Se preferir, também pode usar o token recebido para visualizar a lista diretamente no site.',
    },
    {
      title: 'O presenteado pode comprar o presente diretamente?',
      content:
        'Não. O presenteado apenas visualiza a lista e escolhe a opção preferida.​ O link de compra fica visível somente para quem está presenteando, que é quem finaliza a compra no site do lojista parceiro.',
    },
    {
      title: 'E se a pessoa for difícil de agradar?',
      content:
        '​Sim. As sugestões consideram perfil, interesses e estilo de vida do presenteado.​ Ele recebe seis opções para escolher, o que aumenta muito a chance de acertar — mesmo para quem é difícil de agradar.',
    },
    {
      title: 'Posso gerar novas sugestões se não gostar das primeiras opções?',
      content:
        'Sim. Você pode refazer o perfil do presenteado a qualquer momento e gerar uma nova lista com outras sugestões alinhadas às novas respostas.',
    },
    {
      title: 'O presenteado consegue escolher mais de um item da lista?',
      content:
        'Não. O presenteado escolhe apenas um item da lista como favorito.​ Depois disso, você recebe a confirmação e pode seguir para a compra com segurança.',
    },

    {
      title: 'Consigo manter o presente surpresa mesmo na hora da escolha?',
      content:
        '​Sim. Você escolhe como o presenteado vai acessar a lista: vendo as opções completas ou apenas pistas e dicas. Assim, o momento continua especial, a surpresa permanece — e o acerto no presente também.',
    },
    {
      title: 'O que acontece depois que o presenteado escolhe o presente?',
      content:
        '​Você recebe um aviso por whatsapp para acessar sua área na plataforma, onde pode ver o presente escolhido, o endereço de entrega informado e o link direto para concluir a compra no site do lojista parceiro.',
    },
    {
      title: 'Posso receber sugestões de presentes de lojas específicas que eu prefiro?',
      content:
        'As sugestões priorizam o perfil do presenteado e os parceiros já integrados à plataforma.​ Mas você também pode indicar lojas que gostaria de ver no Smartpresente — avaliamos novas parcerias continuamente para ampliar as opções disponíveis.',
    },
  ],

  parcerias: [
    {
      title: 'Os parceiros da plataforma são confiáveis?',
      content:
        '​Sim. Trabalhamos com lojas e marcas selecionadas, que oferecem boa reputação, compra segura e suporte ao cliente. Assim, você finaliza o presente com tranquilidade, diretamente no site do parceiro.',
    },
    {
      title: 'Como minha loja pode se tornar parceira do Smartpresente?',
      content:
        'Para se tornar parceiro, basta clicar no link “Seja um parceiro”  e preencher um formulário. Nossa equipe avalia o catálogo, a reputação da marca e a aderência ao perfil do público para garantir uma parceria alinhada à proposta da plataforma.',
    },
    {
      title: 'Como a tecnologia do Smartpresente pode beneficiar minha loja?',
      content:
        'A plataforma conecta seus produtos a pessoas com alto potencial de compra, com base no perfil e nos interesses do presenteado. Isso aumenta a relevância das indicações, melhora a conversão e amplia a visibilidade da sua marca para um público mais qualificado.',
    },
    {
      title: 'Como minha marca aparece dentro do Smartpresente?',
      content:
        'Os produtos dos parceiros aparecem nas listas de sugestões sempre que forem compatíveis com o perfil do presenteado. Além disso, mediante acordo prévio, também em espaços de destaque na home da plataforma  — ampliando visibilidade, alcance e tráfego qualificado.',
    },
    {
      title: 'O SmartPresente trabalha apenas com programas de afiliados?',
      content:
        'Não. Além de programas de afiliados, também realizamos parcerias diretas com marcas que desejam maior visibilidade, ações específicas ou integrações personalizadas dentro da plataforma.',
    },
  ],
};
