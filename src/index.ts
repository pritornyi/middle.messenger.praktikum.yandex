import htmlPage404 from './pages/messages/404/404.hbs';
import htmlPage500 from './pages/messages/500/500.hbs';

import auth from './pages/authentiaction/authentiaction.hbs';
import registration from './pages/registration/registation.hbs';
import profile from './pages/profile/profile.hbs';

import LobbyPage from './pages/lobby';
import ChatsPage from './pages/chats';
import './components/button/index.ts';
import './components/message/index.ts';

const router = (app: Element, pathname: string) => {
  if (pathname === '/500.html') {
    app.innerHTML = htmlPage500({ code: 500 });
  } else if (pathname === '/chats.html') {
    const chatsPage = new ChatsPage({
      currentChat: {
        avatar: 'blank.png',
        title: 'Иван',
        messages: [
          {
            content: 'Ура ура ура',
            isOwner: true,
          },
          {
            content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
                    + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
                    + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
                    + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
                    + 'только кассеты с пленкой.\n'
                    + '\n'
                    + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
                    + 'кету они так никогда и не попали. Всего их было произведено 25'
                    + ' штук, одну из них недавно продали на аукционе за 45000 евро.',
            isOwner: false,
          },
          {
            content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
                    + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
                    + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
                    + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
                    + 'только кассеты с пленкой.\n'
                    + '\n'
                    + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
                    + 'кету они так никогда и не попали. Всего их было произведено 25'
                    + ' штук, одну из них недавно продали на аукционе за 45000 евро.',
            isOwner: true,
          },
          {
            content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
                    + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
                    + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
                    + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
                    + 'только кассеты с пленкой.\n'
                    + '\n'
                    + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
                    + 'кету они так никогда и не попали. Всего их было произведено 25'
                    + ' штук, одну из них недавно продали на аукционе за 45000 евро.',
            isOwner: false,
          },
          {
            content: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — '
                    + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.\n'
                    + 'Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все т'
                    + 'ушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали '
                    + 'только кассеты с пленкой.\n'
                    + '\n'
                    + 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ра'
                    + 'кету они так никогда и не попали. Всего их было произведено 25'
                    + ' штук, одну из них недавно продали на аукционе за 45000 евро.',
            isOwner: true,
          },
        ],
      },
      chatList: [
        {
          title: 'login',
          avatar: 'blank.png',
          subtitle: 'ваоповытапотывадлптвыт вадотаывдлтав',
          meta: {
            time: '11:35',
            count: 3,
          },
        },
        {
          title: 'Важно!',
          avatar: 'blank.png',
          subtitle: 'Позвони мне, срочно!!',
          meta: {
            time: '11:35',
            count: 3,
          },
        },
      ],
    });
    app.append(chatsPage.getContent()!);
    chatsPage.dispatchComponentDidMount();
  } else if (
    pathname.startsWith('/5')
    && pathname.replace(/[^+\d]/g, '').length === 3
    && pathname.endsWith('.html')
  ) {
    app.innerHTML = htmlPage500({ code: pathname.replace(/[^+\d]/g, '') });
  } else if (pathname === '/') {
    const lobbyPage = new LobbyPage({ title: 'Home page' });
    app.append(lobbyPage.getContent()!);
    lobbyPage.dispatchComponentDidMount();
  } else if (pathname === '/auth.html') {
    app.innerHTML = auth();
  } else if (pathname === '/registration.html') {
    app.innerHTML = registration();
  } else if (pathname === '/profile.html') {
    app.innerHTML = profile();
  } else if (pathname === '/profile2.html') {
    app.innerHTML = profile({ isEditMode: true });
  } else if (pathname === '/profile3.html') {
    app.innerHTML = profile({ isPasswordEditMode: true });
  } else {
    app.innerHTML = htmlPage404();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  if (app === null) {
    throw new Error('#app element does not exist');
  }

  router(app, window.location.pathname);
});
