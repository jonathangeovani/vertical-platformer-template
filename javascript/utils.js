function collision({ object1, object2, isPlatform = false }) {
  if (!isPlatform)
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y <= object2.position.y + object2.height &&
      object1.position.x + object1.width >= object2.position.x &&
      object1.position.x <= object2.position.x + object2.width
    );
  else
    return (
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y + object1.height <=
        object2.position.y + object2.height &&
      object1.position.x + object1.width >= object2.position.x &&
      object1.position.x <= object2.position.x + object2.width
    );
}
