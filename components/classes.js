export class Phoneme {
    constructor(romanisation, ipa, id) {
        this.romanisation = romanisation
        this.ipa = ipa
        this.id = id
    }
}

export class Pattern {
    constructor(seq, id) {
      this.seq = seq
      this.id = id
    }
    
    gen() {
      var res = [];
      for (var i = 0; i < this.seq.length; i++) {
        if (this.seq[i] instanceof Pattern) {
          res.push(this.seq[i].gen())
        } else if (this.seq[i] instanceof Group) {
          res.push(this.seq[i].gen())
        } else {
          res.push(this.seq[i])
        }
      }
      return res
    }
}
  
function RandomNo(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  
export class Group {
    constructor(seq, id) {
      this.seq = seq
      this.id = id
    }
  
    gen() {
        var i = RandomNo(0, this.seq.length)
        if (this.seq[i] instanceof Pattern) {
            return this.seq[i].gen()
        } else if (this.seq[i] instanceof Group) {
            return this.seq[i].gen()
        } else {
            return this.seq[i]
        }
    }
}