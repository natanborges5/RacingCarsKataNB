import TicketDispenser from '../turn-ticket-dispenser/ticket-dispenser';
import { TurnNumberSequence } from '../turn-ticket-dispenser/turn-number-sequence';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
describe('Turn Ticket Dispenser', () => {

	describe('TurnTicketDispenser', () => {
		it('A new ticket must have the turn number subsequent to the previous ticket', function () {

			var target = new TicketDispenser(new TurnNumberSequence);

			var previousTicket = target.getTurnTicket();
			var newTicket = target.getTurnTicket();
			expect(newTicket.getTurnNumber()).toBeGreaterThan(previousTicket.getTurnNumber());

		});
		it('A new ticket must have the turn number subsequent to the previous ticket from another dispencer', function () {
			const turnNumberSequence = new TurnNumberSequence
			var targetOne = new TicketDispenser(turnNumberSequence);
			var targetTwo = new TicketDispenser(turnNumberSequence);

			var previousTicket = targetOne.getTurnTicket();
			var newTicket = targetTwo.getTurnTicket();

			expect(newTicket.getTurnNumber()).toBeGreaterThan(previousTicket.getTurnNumber());

		});
	});

});
