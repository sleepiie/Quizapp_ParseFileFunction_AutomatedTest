const parseQuestionFile = require('../readfile.js');

describe('parseQuestionFile', () => {
  it('should return File Type Error for non-txt files', async () => {
    const result = await parseQuestionFile('./testfile/question.gif');
    expect(result).toBe('File Type Error');
  });

  it('should return File Type Error for non-txt files', async () => {
    const result = await parseQuestionFile('./testfile/question.mp4');
    expect(result).toBe('File Type Error');
  });

  it('should return File Read Error for non-existent file', async () => {
    const result = await parseQuestionFile('./testfile/nonexistent.txt');
    expect(result).toBe('File Read Error');
  });

  it('should return File integrity error for improperly formatted files', async () => {
    const result = await parseQuestionFile('./testfile/question lack header.txt');
    expect(result).toBe('File integrity error');
  });

  it('should return File integrity error for improperly formatted files', async () => {
    const result = await parseQuestionFile('./testfile/question empty.txt');
    expect(result).toBe('File integrity error');
  });

  it('should return File integrity error for improperly formatted files', async () => {
    const result = await parseQuestionFile('./testfile/question no answer.txt');
    expect(result).toBe('File integrity error');
  });

  it('should return File integrity error for improperly formatted files', async () => {
    const result = await parseQuestionFile('./testfile/question no choice.txt');
    expect(result).toBe('File integrity error');
  });

  it('should return File integrity error for improperly formatted files', async () => {
    const result = await parseQuestionFile('./testfile/question without back $.txt');
    expect(result).toBe('File integrity error');
  });

  it('should return File integrity error for improperly formatted files', async () => {
    const result = await parseQuestionFile('./testfile/question without front $.txt');
    expect(result).toBe('File integrity error');
  });

  it('should correctly parse a valid question file', async () => {
    const result = await parseQuestionFile('./testfile/question.txt');
    expect(result).toEqual([
        {
          header: '',
          question: '1.) ส่วนสูงของนักกีฬาบาสเกตบอลแต่ละคนในทีมโรงเรียนเป็นชุดข้อมูลแบบ population หรือ sample',
          choices: [ 'population', 'sample', 'เป็นทั้ง 2 แบบ', 'ไม่ใช่ทั้ง 2 แบบ' ],
          answer: 1
        },
        {
          header: '',
          question: '2.) อัตราการเต้นของหัวใจของนักกิฬา ในขณะออกกำลังกาย เป็นข้อมูลระดับไหน',
          choices: [ 'Normal', 'Ordinal', 'Intervar', 'Ratio' ],
          answer: 3
        },
        {
          header: 'ข้อมูลตัวอย่างต่อไปนี้แสดงราคาของเครื่องนำทางระบบกำหนดตำแหน่งบนโลก (GPS) แบบพกพาจำนวน 30 ชิ้น (ราคาหน่วยเป็นดอลลาร์) ข้อมูลที่ให้: 90, 130, 400, 200, 350, 70, 325, 250, 150, 250, 275, 270, 150, 130, 59, 200, 160, 450, 300, 130, 220, 100, 200, 400, 200, 250, 95, 180, 170, 150',
          question: '3.) จงหาหาความกว้างของช่วงชั้น (class width)?',
          choices: [ '52', '54', '56', '57' ],
          answer: 2
        },
        {
          header: 'ข้อมูลตัวอย่างต่อไปนี้แสดงราคาของเครื่องนำทางระบบกำหนดตำแหน่งบนโลก (GPS) แบบพกพาจำนวน 30 ชิ้น (ราคาหน่วยเป็นดอลลาร์) ข้อมูลที่ให้: 90, 130, 400, 200, 350, 70, 325, 250, 150, 250, 275, 270, 150, 130, 59, 200, 160, 450, 300, 130, 220, 100, 200, 400, 200, 250, 95, 180, 170, 150',
          question: '4.) ในข้อมูลตัวอย่างราคาของเครื่องนำทาง GPS จำนวน 30 ชิ้นที่ถูกจัดเรียงในตารางแจกแจงความถี่ โดยมีช่วงชั้นทั้งหมด 7 ช่วงชั้น จงหาว่าช่วงชั้นที่ 1 มีความถี่เท่าไร?',
          choices: [ '1', '2', '5', '8' ],
          answer: 3
        },
        {
          header: '',
          question: '5.) จงหา Median ของ "38 15 29 37 63 12"',
          choices: [ '33', '29', '32.5', '31.5' ],
          answer: 3
        },
        {
          header: '',
          question: '6.) จงหา Mode ของ "356 426 514 745 954 253 356 621 452 452 365 562 356 521 694 215 354 689 546 235 653 356 154 868 356 426 546"',
          choices: [ '356', '235', '253', 'ไม่มีคำตอบที่ถูก' ],
          answer: 0
        },
        {
          header: '',
          question: '7.) "6 7 8 10 11 15 17 18 18 19 20 31 54 59 104" จงหา Q1 และ Q3 ของ ข้อมูลที่กำหนด',
          choices: [ '10,  54', '8,  31', '10,  31', '8,  54' ],
          answer: 2
        },
        {
          header: '',
          question: '8.) มีคนอยู่ 100 คน จงหาความเป็นไปได้ที่คนคนหนึ่งจะเลือก A มากกว่า B หากมีคน 75 คนเลือก A',
          choices: [ '25%', '50%', '75%', '100%' ],
          answer: 2
        }
      ]);
  });
});
