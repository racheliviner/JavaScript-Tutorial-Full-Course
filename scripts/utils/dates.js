import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function calcDeliveryDate(deliveryDays){
    const today = dayjs();
    const deliveryDate = today.add(deliveryDays, 'day');
    return deliveryDate.format('dddd, MMMM D');
}
