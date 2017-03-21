import mongoose from 'mongoose';
import conf from '../../config';

mongoose.connect(conf.get('mongoose:uri'));

export default mongoose;
