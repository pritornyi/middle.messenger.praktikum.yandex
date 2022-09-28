import BaseAPI from './BaseAPI';
import { Options } from '../utils/HTTPClient';
import { User } from './AuthAPI';
import { GetListWithPagination } from '../models/GetListWithPagination';

export interface Message extends Options {
    'user': Omit<User, 'id'>
    'time': string,
    'content': string,
}

export interface Chat extends Options {
    'id': number,
    'title': string,
    'avatar': string,
    'unread_count': number,
    'last_message': Message
}

export interface ChatsOptions extends GetListWithPagination{
     title: string
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  get(data: ChatsOptions): Promise<Chat[]> {
    return this.http.get('/', { data });
  }

  getChatsArchive(): Promise<Chat> {
    return this.http.get('/archive');
  }

  create(data:{ title: string}) {
    return this.http.post('/', { data });
  }

  delete(data: { chatId: number }):
      Promise<{
        userId: number,
        result: {
          id: number,
          title: string,
          avatar: string,
      }}> {
    return this.http.delete('/', { data });
  }

  getChatFiles(identifier: number): Promise<User> {
    return this.http.get(`/${identifier}/files`);
  }

  archiveChat(data: {chatId: number}): Promise<Chat> {
    return this.http.post('/archive', { data });
  }

  unArchiveChat(data: {chatId: number}): Promise<Chat> {
    return this.http.post('/archive', { data });
  }

  getChatUsers(identifier: number, data:{offset: number, limit: number, name: string, email: string}): Promise<User[]> {
    return this.http.get(`/${identifier}/`, { data });
  }

  getNewMessages(identifier: number): Promise<{
      'unread_count': number
  }> {
    return this.http.get(`/new/${identifier}`);
  }

  updateAvatar(data: FormData): Promise<Chat> {
    return this.http.post('/chats/avatar', { headers: { 'Content-Type': 'multipart/form-data' }, data });
  }

  addUsersToChat(data: {
      users: number[],
      chatId: number
  }) {
    return this.http.put('/users', { data });
  }

  removeUsersFromChat(data: {
        users: number[],
        chatId: number
    }) {
    return this.http.delete('/users', { data });
  }

  getMessagerServerToken(identifier: number) {
    return this.http.get(`/token/${identifier}`);
  }

  read = undefined;

  update = undefined;
}

export default new ChatsAPI();
