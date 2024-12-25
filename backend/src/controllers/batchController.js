export const registerBatch = async (req, res) => {
    try {
      const { batchId, productName, quantity } = req.body;
      const transaction = await req.contract.registerBatch(batchId, productName, quantity);
      await transaction.wait();
      res.status(200).send({ message: 'Batch registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error registering batch' });
    }
  };
  
  export const getBatchDetails = async (req, res) => {
    try {
      const { batchId } = req.params;
      const batch = await req.contract.getBatchDetails(batchId);
      res.status(200).json(batch);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error fetching batch details' });
    }
  };
  