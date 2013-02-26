symbols_low = [
 ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
 ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
 ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
 ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
 [' ']
];

symbols_up = [
 ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
 ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
 ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'],
 ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'],
 [' ']
];


row_coordinates = [
  {start: 0, end: 64},
  {start: 73, end: 134 },
  {start: 143, end: 205 },
  {start: 215, end: 276 }
]

symbols_coordinates = [
  {start: 2, end: 928},
  {start: 140, end: 1064 },
  {start: 81, end: 863 },
  {start: 181, end: 892 }
]

function addSymbol(text_id, symbol) {
  prev = $(text_id);  
  prev.val(prev.val() + symbol);
}

function eraseSymbol(text_id) {
  prev = $(text_id);
  prev.val(prev.val().substr(0, prev.val().length - 1));
}

function upcaseKeyboard() {
  $('#keyboard_lowcase').hide();
  $('#keyboard_upcase').show();
}

function lowcaseKeyboard() {
  $('#keyboard_upcase').hide();
  $('#keyboard_lowcase').show();
}

function switchCaseKeyboard() {
  if(isUppercaseKeyboard()) {
    lowcaseKeyboard();
  }
  else {
    upcaseKeyboard();
  }
}

function isUppercaseKeyboard() {
  if($('#keyboard_upcase').is(':visible')) {
    return true;
  }
  return false;
}

function handle_click(event) {
    pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("keyboard").offsetLeft;
    pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("keyboard").offsetTop;
//    alert("X: " + pos_x + ", Y: " + pos_y);
    if(is_shift(pos_x, pos_y)) {
      switchCaseKeyboard();
    }
    else if(is_backspace(pos_x, pos_y)) {
      eraseSymbol(".field");
    }
    else if(is_space(pos_x, pos_y)) {
      addSymbol(".field", ' ');
    }
    else {
      symb = get_symbol(pos_x, pos_y);
      if(symb != null) {
        addSymbol(".field", symb);
      }
    }
}

function is_shift(x, y) {
  if((x > 905 && y > 220 && x < 961 && y < 272) || (x > 111 && y > 220 && x < 170 && y < 272)) {
    return true;
  }
  return false;
}

function is_backspace(x, y) {
  if(x > 940 && y > 6 && x < 1069 && y < 79) {
    return true;
  }
  return false;
}

function is_space(x, y) {
  if(x > 363 && y > 267 && x < 709 && y < 341) {
    return true;
  }
  return false;
}

function get_symbol(x, y) {
  row = get_row_index(y);
//  alert("row = " + row);
  if(row == null) {
    return(null);
  }
  symbol = get_symbol_in_row(row, x);
//  alert("symbol = " + symbol);
  return(symbol);
}

function get_row_index(y) {
  for(i = 0; i < row_coordinates.length; i++) {
    if(y > row_coordinates[i]['start'] && y < row_coordinates[i]['end']) {
      return i;
    }
  }
  return null;
}

function get_symbol_in_row(row, x) {
  x_start = symbols_coordinates[row]['start'];
  x_end = symbols_coordinates[row]['end'];
//  alert("x_start = " + x_start + ", x_end = " + x_end);
  if(x > x_end || x < x_start) {
    return null;
  }

  symbol_width = 72;
  symbol_idx = Math.floor( (x - x_start) / symbol_width);
//  alert("symbol_idx = " + symbol_idx);
  if(isUppercaseKeyboard()) {
    return(symbols_up[row][symbol_idx]);
  }
  return(symbols_low[row][symbol_idx]);
}