import { IRoom } from '../room/IRoom';

interface IValidateMaxGuests {
  getFieldValue: (name: string) => any;
  field: string;
  value: number;
  roomSelected: IRoom | undefined;
}

export const validateMaxGuests = ({
  getFieldValue,
  field,
  value,
  roomSelected,
}: IValidateMaxGuests) => {
  if (
    roomSelected?.guests &&
    getFieldValue(field) + value > roomSelected?.guests
  ) {
    return Promise.reject(
      new Error(
        `The max guests (adults + children) for this room is: ${roomSelected?.guests}`,
      ),
    );
  }
  return Promise.resolve();
};
