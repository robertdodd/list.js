describe('Add, get, remove', function() {

  var list;

  before(function() {
    list = fixture.list(['name'], [ { name: "Jonny" } ]);
  });

  after(function() {
    fixture.removeList();
  });

  afterEach(function() {
    list.clear();
    list.add({ name: "Jonny" });
  });

  describe('Add', function() {
    it('should add one item', function() {
      list.add({ name: 'Jonas' });
      expect(list.items.length).to.equal(2);
    });
    it('should add two items', function() {
      list.add([
        { name: 'Martina' },
        { name: 'Angelica' }
      ]);
      expect(list.items.length).to.equal(3);
    });
    it('should add async items', function(done) {
      list.add([
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'}
      ], function() {
        expect(list.items.length).to.equal(91);
        done();
      });
    });
    it('should add async items to empty list', function(done) {
      list.clear();
      list.add([
        { name: 'Sven' }
      ], function() {
        expect(list.items.length).to.equal(1);
        done();
      });
    });
  });

  describe('Get', function() {
    it('should return array with one item', function() {
      var items = list.get('name', 'Jonny');
      expect(items[0].values().name).to.equal('Jonny');
    });
    it('should return empty array', function() {
      var items = list.get('name', 'jonny');
      expect(items.length).to.be.zero;
    });
    it('should return two items', function() {
      list.add({ name: 'Jonny' });
      var items = list.get('name', 'Jonny');
      expect(items.length).to.equal(2);
      expect(items[0].values().name).to.equal('Jonny');
      expect(items[1].values().name).to.equal('Jonny');
    });
  });

  describe('Remove', function() {
    it('should remove one item', function() {
      list.add({ name: "Jonas" });
      expect(list.items.length).to.equal(2);
      var count = list.remove('name', 'Jonas');
      expect(count).to.equal(1);
      expect(list.items.length).to.equal(1);
    });
    it('should not remove anything due to case sensitivity', function() {
      var count = list.remove('name', 'jonny');
      expect(count).to.be.equal(0);
      expect(list.items.length).to.equal(1);
    });

    it('should remove eight items', function() {
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Sven' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonas' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      expect(list.items.length).to.equal(10);
      var count = list.remove('name', 'Jonny');
      expect(count).to.equal(8);
      expect(list.items.length).to.equal(2);
    });
  });
});
