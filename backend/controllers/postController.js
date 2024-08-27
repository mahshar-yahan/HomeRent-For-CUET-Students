const prisma = require("../common/prisma");
const cloudinary = require("../services/cloudinary");

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        comments: true,
        book: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPostsBySearch = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            details: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get a post by id
const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        book: true,
        comments: true,
      },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      title,
      photos,
      price,
      seatCapacity,
      type,
      available,
      contact,
      details,
      location,
      coordinates,
    } = req.body;

    // const uploadedImages = await Promise.all(
    //   req.files.map(async (file) => {
    //     const result = await cloudinary.uploader.upload(file.path);
    //     return result.secure_url;
    //   })
    // );

    const post = await prisma.post.create({
      data: {
        title,
        photos,
        price: parseInt(price),
        seatCapacity: parseInt(seatCapacity),
        type,
        available,
        contact,
        details,
        location,
        coordinates,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update post
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const { seatCapacity } = req.body;

    const oldPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    let newSeatCapacity, newAvailable;
    if (oldPost.seatCapacity - seatCapacity < 0) {
      return res.status(400).json({
        error: "Seat capacity must be less than or equal to available seat",
      });
    }

    if (oldPost.seatCapacity - seatCapacity === 0) {
      newSeatCapacity = 0;
      newAvailable = false;
    } else {
      newSeatCapacity = oldPost.seatCapacity - seatCapacity;
    }

    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...req.body,
        available: newAvailable,
        seatCapacity: newSeatCapacity,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePostProfile = async (req, res) => {
  try {
    const { postId } = req.params;

    // const oldPost = await prisma.post.findUnique({
    //   where: {
    //     id: postId,
    //   },
    // });
    // console.log(req.body);

    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...req.body,
      },
    });
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPostsBySearch,
  updatePostProfile,
};
