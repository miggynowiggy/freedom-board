import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import RelativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(RelativeTime);
dayjs.extend(AdvancedFormat);

export { dayjs };
