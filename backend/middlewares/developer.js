function titleCaseName(request, response, next){
    try {
      let letters = request.body.firstName.split('');
      let firstLetter = letters.splice(0, 1).join('').toUpperCase();
      let remainingLetters = letters.join('').toLowerCase();
      request.body.firstName = `${firstLetter}${remainingLetters}`;

      letters = request.body.lastName.split('');
      firstLetter = letters.splice(0, 1).join('').toUpperCase();
      remainingLetters = letters.join('').toLowerCase();
      request.body.lastName = `${firstLetter}${remainingLetters}`;

      if(request.body.otherNames){
        console.log('otherName', request.body.otherNames);

        let rrr = [];
        const fragments = request.body.otherNames.split(' ');
        console.log('fragments',fragments);
        for(let one of fragments){
            if(one && one.trim()){
                console.log('one', one)
                letters = one.split('');
                firstLetter = letters.splice(0, 1).join('').toUpperCase();
                remainingLetters = letters.join('').toLowerCase();
                rrr.push(`${firstLetter}${remainingLetters}`);
            }
        }
        request.body.otherNames =  rrr.join(' ');
      }
      next();
    } catch(error){
      return response.status(500).send({success: false, message: error.message})
    }
  }

  function logModifiedName(request, response, next){
    try{
      console.log('Modified firstName in middle ware file', request.body.firstName);
      console.log('Modified lastName in middle ware file', request.body.lastName);
      console.log('Modified otherNames in middle ware file', request.body.otherNames);
      next()
    }catch(error){message
      return response.status(500).send({success: false, message: error.message})
    }
  }

  module.exports = {
    titleCaseName,
    logModifiedName
  }