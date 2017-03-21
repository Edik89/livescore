import mongoose from './schema/moongoseConnect';
import { getSchema } from '@risingstack/graffiti-mongoose';

import LiveResultSchema from './schema/LiveResultSchema';

export default getSchema(LiveResultSchema);

