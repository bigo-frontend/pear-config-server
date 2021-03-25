import 'egg';

// 全局ts声明，勿删除
declare module 'egg' {
  interface Application {
    [key: string]: any;
  }
}
