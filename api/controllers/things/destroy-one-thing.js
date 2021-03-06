module.exports = {


  friendlyName: 'Destroy one thing',


  description: 'Delete the "thing" with the specified ID from the database.',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    forbidden: {
      description: 'The user making this request doesn\'t have the permissions to delete this thing.',
      respondeType: 'forbidden'
    }
  },


  fn: async function (inputs, exists) {

    var thing = await Thing.findOne({
      id: inputs.id
    });

    if(thing.owner !== this.req.me.id) {
      throw 'forbidden';
    }

    await Thing.destroy({ id: inputs.id });
    // All done.
    return;

  }


};
