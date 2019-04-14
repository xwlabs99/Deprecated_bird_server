/* eslint-disable  */

// import { Promise } from 'bluebird';
const { Wechaty, Friendship } = require('wechaty');

function onScan(qrcode) {
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');
  console.log(qrcodeImageUrl);
}

class wechat {
  constructor() {
    this.wechatBot = new Wechaty();
    this.status = '未登录';

    const bot = this.wechatBot;
    const _events = wechat._events;

    bot.on('scan', qrcode => onScan(qrcode) );
    bot.on('login', user => { 
        this.status = '已登陆';
        _events.login(user);
    });
    bot.on('logout', user => {
        this.status = '已离线'
        _events.logout(user);
    });
    bot.on('message', _events.newMessage);
    bot.on('friendship', _events.newFriendship);
    bot.start()
      .then(() => console.log('开始登陆微信'))
      .catch(e => console.error(e));
  }
  /**
   * @param {string} content
   * content
   * @param {string} name
   * wechatname
   */
  async sendToUserByName(content, name) {
    const bot = this.wechatBot;
    const contact = await bot.Contact.find({ name });
    if (contact) {
      contact.say(content);
    }
  }
  /**
   * @param {string} content
   * content
   * @param {string} alias
   * wechat_alias
   */
  async sendToUserByAlias(content, alias) {
    const bot = this.wechatBot;
    const contact = await bot.Contact.find({ alias });
    if (contact) {
      contact.say(content);
    }
  }
  /**
   * @param {string} content
   * @param {string} roomName
   */
  async sendToRoom(content, roomName) {
    const bot = this.wechatBot;
    const room = await bot.Room.find({ topic: roomName });
    if (room) {
      try {
        room.say(content);
      } catch (e) {
        console.error(e);
      }
    }
  }
  /**
   * @param {string} ContactAliasList
   * @param {string} roomName
   */
  async createRoom(ContactAliasList, roomName) {
    const bot = this.wechatBot;
    const list = Promise.all(
      ContactAliasList.map(async alias => {
        await bot.Contact.find({ alias });
      })
    );
    await bot.Room.create(list, roomName);
  }
  /**
   * @param {string} roomName
   * @param {string} newAnnouncement
   */
  async setRoomAnnouncement(roomName, newAnnouncement) {
    const bot = this.wechatBot;
    const room = await bot.Room.find({ topic: roomName });
    await room.announce(newAnnouncement);
  }
  /**
   * @param {string} oldRoomName
   * @param {string} newRoomName
   */
  async setRoomName(oldRoomName, newRoomName) {
    const bot = this.wechatBot;
    const room = await bot.Room.find({ topic: oldRoomName });
    await room.topic(newRoomName);
  }
  /**
   * @param {string} name
   * @param {string} roomName
   */
  async inviteToRoomByName(name, roomName) {
    const bot = this.wechatBot;
    const contact = await bot.Contact.find({ name });
    const room = await bot.Room.find({ topic: roomName });
    if (room) {
      try {
        await room.add(contact);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
  /**
   * @param {string} alias
   * @param {string} roomName
   */
  async inviteToRoomByAlias(alias, roomName) {
    const bot = this.wechatBot;
    const contact = await bot.Contact.find({ alias });
    const room = await bot.Room.find({ topic: roomName });
    if (room) {
      try {
        await room.add(contact);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
  /**
   * @param {string} name
   */
  async findContactByName(name) {
    const bot = this.bot;
    return await bot.Contact.find({ name });
  }
  /**
   * @param {string} alias
   */
  async findContactByAlias(alias) {
    const bot = this.bot;
    return await bot.Contact.find({ alias });
  }
}

wechat._events = {
    login: (user) => {
        console.log(`魏祥的机器人${user}登录了`);
    },
    logout: (user) => {
        console.log(`魏祥的机器人${user}登录了`);
    },
    roomJoin: () => {
    },
    newMessage: async message => {
      const contact = message.from();
      const content = message.text();
      const room = message.room();
      if (room) {
        console.log(`群名: ${room.topic()} 发消息人: ${contact.name()} 内容: ${content}`);
      } else {
        console.log(`发消息人: ${contact.name()} 消息内容: ${content} ${contact.alias()}`);
      }
      if (message.self()) {
        return;
      }
      // let [option,param]=content.split(':');
      const option = content;
      contact.say('Hello,这里是DJ的微信机器人，DJ可能暂时有事，一旦看到消息就会立即回复哈！');
      switch (option) {
        case '创建群聊':
        {
          const name = await contact.alias();
          wechat.room.create(name, '客服群');
          break;
        }
        case '自动拉人':
          wechat.room.inviteByAlias('测试账号', '客服群');
          break;
        case '群消息':
          wechat.message.sendToRoom('客服群消息', '客服群');
          break;
        case '个人消息':
          wechat.message.sendToUserByName('个人消息', '未详吹牛中');
          break;
        case '修改群公告':
          wechat.room.setName('客服群', '新客服群');
          break;
        default:
          break;
      }
  
    },
    newFriendship: async friendship => {
      const contact = friendship.contact();
      // const hello = friendship.hello();
      const tips = '如果有什么可以帮助你的，可以回复相应指令继续操作哦！';
      try {
        console.log('received friend event.');
        switch (friendship.type()) {
          case Friendship.Type.Receive:
            // 自动发送信息 确认信息等等逻辑
            await friendship.accept();
            await contact.alias('测试账号');
            await contact.say('Hello,这里是管家机器人!');
            await contact.say(tips);
            break;
  
          case Friendship.Type.Confirm:
            // 自动发送信息 确认信息等等逻辑
            // await friendship.accept();
            await contact.alias('测试账号');
            await contact.say('Hello,这里是管家机器人!');
            await contact.say(tips);
            break;
        }
      } catch (e) {
        console.error(e);
      }
    },
  };

module.exports = wechat;