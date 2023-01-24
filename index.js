class Pokemon {
  constructor(name, health, magic, flaying, skills) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.flaying = flaying;
    this.skills = [];
  }
  learnAttackSkill(skill) {
    return this.skills.push(skill);
  }
  showAttackSkill() {
    return this.skills.map((skill) => skill.attackName.toUpperCase());
  }
  numberOfAttackSkill() {
    return this.skills.length;
  }

  showStatus() {
    let status =
      `${this.name} \n Health:${this.health} \n Magic : ${this.magic}\n` +
      "***************************";
    return status.trim();
  }

  attack(index, enemy) {
    let result = "";
    let weapon = this.skills[index];
    if (enemy.health < 0) {
      return `${enemy.name} is killed!` + "\n" + "***************************";
    } else if (
      weapon.amountMagic <= this.magic &&
      this.health > 0 &&
      enemy.health > 0
    ) {
      this.magic -= weapon.amountMagic;
      enemy.health -= weapon.attackDamage;
      result +=
        `${this.name} launched skill ${weapon.attackName} successfully!` +
        "\n" +
        `${enemy.name} got${weapon.attackDamage} damage` +
        "\n" +
        "***************************" +
        "\n";

      return result;
    } else if (
      weapon.amountMagic > this.magic &&
      this.health > 0 &&
      enemy.health > 0
    ) {
      return (
        "not enough magic, cannot launch attack! \n" +
        "***************************"
      );
    } else if (this.health < 0) {
      return (
        `${this.name} is already dead!` + "\n" + "***************************"
      );
    }
  }
  flayingAttack(index, enemy) {
    let weapon = this.skills[index];
    if (this.flaying === false) {
      return `${this.name} can't fly`;
    } else if (
      this.flaying === true &&
      this.magic >= weapon.amountMagic &&
      this.health > 0 &&
      enemy.health > 0
    ) {
      this.magic -= weapon.amountMagic;
      let multipleDamage = weapon.attackDamage * 2;
      enemy.health -= multipleDamage;
      return (
        `${this.name} flayed and  launched skill ${weapon.attackName} successfully!\n ${enemy.name} got ${multipleDamage} Damage \n` +
        "***************************"
      );
    } else if (
      this.flaying === true &&
      this.magic < weapon.amountMagic &&
      this.health > 0 &&
      enemy.health > 0
    ) {
      return (
        "not enough magic, cannot launch attack! \n" +
        "***************************"
      );
    } else if (enemy.health < 0) {
      return `${enemy.name} is killed!` + "\n" + "***************************";
    } else if (this.health < 0) {
      return (
        `${this.name} is already dead!` + "\n" + "***************************"
      );
    }
  }
  getMagic() {
    this.magic += 20;
    let bonus =
      `${this.name} got 20 magic back` + "\n" + "***************************";
    return bonus.trim();
  }
  flee() {
    return `${this.name} just fled.` + "\n" + "***************************";
  }
}

class AttackSkill {
  constructor(attackName, attackDamage, amountMagic) {
    this.attackName = attackName;
    this.attackDamage = attackDamage;
    this.amountMagic = amountMagic;
  }
}
let pikachu = new Pokemon("pikachu", 120, 80, false);
let bulbasaur = new Pokemon("bulbasaur", 95, 105, false);
let abomasnow = new Pokemon("Abomasnow", 130, 99, true);
let abra = new Pokemon("Abra", 100, 100, false);

//Each skill should do a certain amount of damage, and consume a certain amount of magic from the Pokemon that used the skill.
let lightning = new AttackSkill("lightning", 40, 30);
let poisonSeed = new AttackSkill("poison seed", 20, 20);
let electric = new AttackSkill("Electric", 150, 30);

pikachu.learnAttackSkill(lightning);
pikachu.learnAttackSkill(electric);
bulbasaur.learnAttackSkill(poisonSeed);
abra.learnAttackSkill(lightning);
abomasnow.learnAttackSkill(poisonSeed);

//The first argument to `attack` should be the index (or key) of the attack
console.log(pikachu.attack(0, bulbasaur));
console.log(bulbasaur.attack(0, pikachu));
console.log(pikachu.showStatus());
console.log(bulbasaur.showStatus());

console.log(pikachu.attack(0, bulbasaur));
console.log(pikachu.attack(0, bulbasaur));
console.log(pikachu.getMagic());
console.log(pikachu.attack(0, bulbasaur));
console.log(pikachu.attack(0, bulbasaur));
console.log(bulbasaur.attack(0, pikachu));
console.log(
  "The end of the fight\n".toUpperCase() + "***************************"
);

console.log(abomasnow.flayingAttack(0, abra));
console.log(abra.attack(0, abomasnow));
console.log(abomasnow.showStatus());
console.log(abra.showStatus());
console.log(abomasnow.flayingAttack(0, abra));
console.log(abra.attack(0, abomasnow));
console.log(abomasnow.showStatus());
console.log(abra.showStatus());
console.log(abra.flee());
console.log(pikachu.showAttackSkill());
console.log(pikachu.numberOfAttackSkill());
