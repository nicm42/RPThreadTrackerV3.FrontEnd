import analytics from '../../constants/analytics';

export const OPEN_UPSERT_CHARACTER_MODAL = 'OPEN_UPSERT_CHARACTER_MODAL';
export function openUpsertCharacterModal(character) {
	return {
		type: OPEN_UPSERT_CHARACTER_MODAL,
		data: character,
		analytics: {
			func: analytics.funcs.MODALVIEW,
			path: character && character.characterId ? '/modals/update-character' : '/modals/add-character'
		}
	};
}
