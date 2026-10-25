/**
 * Admin-dashboard strings. Kept in a separate namespace from the public site
 * `Strings` so the public dictionaries stay focused. All four admin
 * dictionaries are typed as `AdminStrings`, giving the same compile-time
 * guarantee of key parity as the public site.
 */
export interface AdminStrings {
  'admin.title': string
  'admin.login': string
  'admin.login.desc': string
  'admin.email': string
  'admin.password': string
  'admin.signin': string
  'admin.signin.failed': string
  'admin.email.required': string
  'admin.email.invalid': string
  'admin.password.required': string
  'admin.logout': string
  'admin.you': string

  'admin.nav.overview': string
  'admin.nav.projects': string
  'admin.nav.messages': string
  'admin.nav.content': string
  'admin.nav.media': string
  'admin.nav.audit': string
  'admin.nav.settings': string

  'admin.overview.title': string
  'admin.overview.projects': string
  'admin.overview.published': string
  'admin.overview.drafts': string
  'admin.overview.messages': string
  'admin.overview.recent': string
  'admin.overview.byCategory': string
  'admin.overview.empty': string

  'admin.projects.title': string
  'admin.projects.add': string
  'admin.projects.search': string
  'admin.projects.allStatus': string
  'admin.projects.slug': string
  'admin.projects.category': string
  'admin.projects.status': string
  'admin.projects.updated': string
  'admin.projects.actions': string
  'admin.projects.edit': string
  'admin.projects.new': string
  'admin.projects.save': string
  'admin.projects.cancel': string
  'admin.projects.publish': string
  'admin.projects.unpublish': string
  'admin.projects.delete': string
  'admin.projects.deleteConfirm': string
  'admin.projects.saved': string
  'admin.projects.deleted': string
  'admin.projects.statusChanged': string
  'admin.projects.error': string
  'admin.projects.slugImmutable': string
  'admin.projects.field.source': string
  'admin.projects.field.statusNote': string
  'admin.projects.field.url': string
  'admin.projects.field.repo': string
  'admin.projects.field.cover': string
  'admin.projects.field.technologies': string
  'admin.projects.field.technologies.hint': string
  'admin.projects.field.capabilities': string
  'admin.projects.field.capabilities.hint': string
  'admin.projects.field.locales': string
  'admin.projects.field.locales.name': string
  'admin.projects.field.locales.short': string
  'admin.projects.field.locales.full': string
  'admin.projects.required': string
  'admin.projects.slugFormat': string

  'admin.messages.title': string
  'admin.messages.all': string
  'admin.messages.search': string
  'admin.messages.empty': string
  'admin.messages.from': string
  'admin.messages.company': string
  'admin.messages.type': string
  'admin.messages.markRead': string
  'admin.messages.markUnread': string
  'admin.messages.resolve': string
  'admin.messages.archive': string
  'admin.messages.restore': string
  'admin.messages.delete': string
  'admin.messages.deleteConfirm': string
  'admin.messages.updated': string
  'admin.messages.consent': string
  'admin.messages.status.unread': string
  'admin.messages.status.read': string
  'admin.messages.status.resolved': string
  'admin.messages.status.archived': string

  'admin.content.title': string
  'admin.content.desc': string
  'admin.content.save': string
  'admin.content.saved': string
  'admin.content.reset': string
  'admin.content.resetConfirm': string
  'admin.content.resetDone': string
  'admin.content.language': string

  'admin.media.title': string
  'admin.media.desc': string
  'admin.media.upload': string
  'admin.media.select': string
  'admin.media.empty': string
  'admin.media.uploaded': string
  'admin.media.uploadError': string
  'admin.media.tooLarge': string
  'admin.media.badType': string

  'admin.audit.title': string
  'admin.audit.desc': string
  'admin.audit.action': string
  'admin.audit.actor': string
  'admin.audit.target': string
  'admin.audit.detail': string
  'admin.audit.when': string
  'admin.audit.empty': string

  'admin.settings.title': string
  'admin.settings.password': string
  'admin.settings.password.desc': string
  'admin.settings.current': string
  'admin.settings.new': string
  'admin.settings.confirm': string
  'admin.settings.change': string
  'admin.settings.changed': string
  'admin.settings.match': string
  'admin.settings.tooShort': string
  'admin.settings.wrong': string
  'admin.settings.error': string
  'admin.settings.account': string
  'admin.settings.role': string

  'admin.common.loading': string
  'admin.common.error': string
  'admin.common.back': string
  'admin.common.confirm': string
  'admin.common.cancel': string
  'admin.common.yes': string
}
