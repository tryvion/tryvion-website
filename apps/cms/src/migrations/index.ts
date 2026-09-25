import * as migration_20260911_071221 from './20260911_071221';
import * as migration_20260911_100801 from './20260911_100801';
import * as migration_20260912_115949 from './20260912_115949';
import * as migration_20260914_065924 from './20260914_065924';
import * as migration_20260914_104721_add_customer_support_locked_documents_relation from './20260914_104721_add_customer_support_locked_documents_relation';
import * as migration_20260925_122220_customer_support_engagement_schema from './20260925_122220_customer_support_engagement_schema';

export const migrations = [
  {
    up: migration_20260911_071221.up,
    down: migration_20260911_071221.down,
    name: '20260911_071221',
  },
  {
    up: migration_20260911_100801.up,
    down: migration_20260911_100801.down,
    name: '20260911_100801',
  },
  {
    up: migration_20260912_115949.up,
    down: migration_20260912_115949.down,
    name: '20260912_115949',
  },
  {
    up: migration_20260914_065924.up,
    down: migration_20260914_065924.down,
    name: '20260914_065924',
  },
  {
    up: migration_20260914_104721_add_customer_support_locked_documents_relation.up,
    down: migration_20260914_104721_add_customer_support_locked_documents_relation.down,
    name: '20260914_104721_add_customer_support_locked_documents_relation',
  },
  {
    up: migration_20260925_122220_customer_support_engagement_schema.up,
    down: migration_20260925_122220_customer_support_engagement_schema.down,
    name: '20260925_122220_customer_support_engagement_schema'
  },
];
