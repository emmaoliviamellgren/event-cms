import { metadata } from '@/app/layout';

describe('Metadata', () => {
    it('renders the title EventCorp.', () => {
        expect(metadata.title).toBe('EventCorp.');
    });
});
