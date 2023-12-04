import { TurnNumberSequence } from './turn-number-sequence';
import TurnTicket from './turn-ticket';

/* The TicketDispenser class is responsible for generating turn tickets based on a given turn number
sequence. */
export default class TicketDispenser {
  private turnNumberSequence: TurnNumberSequence;

  constructor(turnNumberSequence: TurnNumberSequence) {
    this.turnNumberSequence = turnNumberSequence;
  }
  public getTurnTicket(): TurnTicket {
    const newTurnNumber = this.turnNumberSequence.getNextTurnNumber();
    const newTurnTicket = new TurnTicket(newTurnNumber);
    return newTurnTicket;
  }
}