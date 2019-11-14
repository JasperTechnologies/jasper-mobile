import { StarPRNT } from 'react-native-star-prnt';

const ORDER_TYPE_TO_TEXT = {
  'EAT_HERE': 'EAT HERE',
  'TO_GO': 'TO GO'
};

export function toOrderReceipt(cart, orderId, orderType) {
  const commands = [];
  let itemCount = 1;
  const totalItemCount = cart.reduce((count, item) => {
    return count + item.form.quantity;
  }, 0);
  cart.forEach((item) => {
    for (i = 0; i < item.form.quantity; i++) {
      commands.push({
        appendBitmapText: "=========================="
      });
      commands.push({
        appendBitmapText: `Order#: ${orderId}`
      });
      commands.push({
        appendBitmapText: `Order Type: ${ORDER_TYPE_TO_TEXT[orderType]}`
      });
      commands.push({
        appendBitmapText: "==========================\n"
      });
      commands.push({
        appendBitmapText: `${item.title} [Item ${itemCount} out of ${totalItemCount}]\n`
      });
      item.form.optionValues.forEach((ov) => {
        commands.push({
          appendBitmapText: ` ${ov.title}\n`
        });
      });
      commands.push({appendCutPaper:StarPRNT.CutPaperAction.PartialCutWithFeed});
      itemCount += 1;
    }

  });

  return commands;
}

export function toCustomerReceipt(cart, orderId, orderType) {
  const commands = [];
  commands.push({
    appendBitmapText: "=========================="
  });
  commands.push({
    appendBitmapText: `Order#: ${orderId}`
  });
  commands.push({
    appendBitmapText: `Order Type: ${ORDER_TYPE_TO_TEXT[orderType]}`
  });
  commands.push({
    appendBitmapText: "==========================\n"
  });
  cart.forEach((item) => {
    for (i = 0; i < item.form.quantity; i++) {
      commands.push({
        appendBitmapText: `${item.title}\n`
      });
      item.form.optionValues.forEach((ov) => {
        commands.push({
          appendBitmapText: ` ${ov.title}\n`
        });
      });
    }
  });
  commands.push({
    appendBitmapText: "\nThank you!\n"
  });
  commands.push({appendCutPaper:StarPRNT.CutPaperAction.PartialCutWithFeed});
  return commands;
}

export async function printKitchenReceipt(cart, orderId, orderType, portName) {
  for (i = 0; i < 3; i++) {
    const kitchenPrintResult = await StarPRNT.print("StarGraphic", toOrderReceipt(cart, orderId, orderType), portName);
    if (kitchenPrintResult.result || kitchenPrintResult.message === "Success") {
      break;
    }
    await delay(2000);
  }
}

export async function printCustomerReceipt(cart, orderId, orderType, portName) {
  for (i = 0; i < 3; i++) {
    const kitchenPrintResult = await StarPRNT.print("StarGraphic", toCustomerReceipt(cart, orderId, orderType), portName);
    if (kitchenPrintResult.result || kitchenPrintResult.message === "Success") {
      break;
    }
    await delay(2000);
  }
}

export function findPrinters() {
  return StarPRNT.portDiscovery('LAN');
}
