import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.index);

  // 权限管理
  router.post(`/privilege`, controller.privilege.create);
  router.put(`/privilege/:id`, controller.privilege.update);
  router.delete(`/privilege/:id`, controller.privilege.remove);
  router.get(`/privilege`, controller.privilege.list);

  // 文件上传
  router.post(`/material/upload`, controller.material.upload);

  // 空间分类
  router.post(`/env`, controller.env.create);
  router.put(`/env`, controller.env.update);
  router.get(`/env`, controller.env.list);

  // json-schema配置
  router.post(`/form`, controller.form.create);
  router.put(`/form/:id`, controller.form.update);
  router.delete(`/form/:id`, controller.form.remove);
  router.get(`/form`, controller.form.list);
  router.get(`/form/:id`, controller.form.detail);
  router.post(`/form/detail`, controller.form.detail);

  // json配置
  router.post(`/keyValue`, controller.keyValue.create);
  router.put(`/keyValue/:id`, controller.keyValue.update);
  router.delete(`/keyValue/:id`, controller.keyValue.remove);
  router.get(`/keyValue/tags`, controller.keyValue.tagList);
  router.put(`/keyValue/:id/tags`, controller.keyValue.updateTags);
  router.put(`/keyValue/:id/editors`, controller.keyValue.updateEditors);
  router.post(`/keyValue/copy`, controller.keyValue.copy);
  router.post(`/keyValue/updateStatus`, controller.keyValue.updateStatus);
  router.get(`/keyValue`, controller.keyValue.list);
  router.get(`/config/:mode/:id`, controller.keyValue.detail);
  
  // json配置草稿
  router.get(`/keyValueDraft`, controller.keyValueDraft.list);
  router.post(`/keyValueDraft/rollback`, controller.keyValueDraft.rollback);

  // records
  router.get(`/records`, controller.records.list);
  router.post(`/records/rollback`, controller.records.rollback);
  router.get(`/records/preview/:mode/:id`, controller.records.detail);
};
