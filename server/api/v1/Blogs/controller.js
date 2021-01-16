const express = require('express');
const bcrypt = require('bcryptjs');
const Blog = require('../../../models/Blog');
const HTTPRESPONSE = require('../../../utils/httpResponses');

module.exports = {
  addBlog: async (req, res) => {
    try {
      const newBlog = new Blog({
        id: req.body.id,
        creatorId: req.body.creatorId,
        title: req.body.title,
        blogHeaderImage: req.body.blogHeaderImage,
        text: req.body.text,
        images: req.body.images,
        creatorName: req.body.creatorName,
        dateSubmitted: req.body.dateSubmitted,
        datePublished: req.body.datePublished,
        dateUpdated: req.body.dateUpdated,
        isApproved: req.body.isApproved,
        numLikes: req.body.numLikes,
        numDislikes: req.body.numDislikes,
        reportsCounter: req.body.reportsCounter,
        interactionIdList: req.body.interactionIdList,
        reportlistList: req.body.reportlistList,
        commentsIdList: req.body.commentsIdList,
        numOfReads: req.body.numOfReads,
        status: req.body.status,
      });
      const data = await newBlog.save();
      // return res.json(blog);
      return HTTPRESPONSE.CREATED('Blog created successfully', data);
    } catch (error) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  getAllBlogs: async (req, res) => {

    try {
      let blogs = await Blog.find();

      if (!blogs) {

        return HTTPRESPONSE.NOT_FOUND('Blog not found', {
          error: 'Blog not found',
        });
      }

      else {
        return HTTPRESPONSE.SUCCESS('Blog list found', blogs);

      }
    } catch (error) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  getBlogsById: async (req, res) => {

    try {
      let blog = await Blog.findOne({ _id: req.params.id });
      if (blog) {
        return HTTPRESPONSE.SUCCESS('Blog found', blog);
      }
      else {
        return HTTPRESPONSE.NOT_FOUND('Blog not found', {
          error: 'Blog not found',
        });
      }
    } catch (error) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },

  updateBlog: async (req, res) => {
    try {
      let blog = await Blog.findById(req.params.id);
      if (blog) {
        blog.id = req.body.id;
        blog.creatorId = req.body.creatorId;
        blog.title = req.body.title;
        blog.blogHeaderImage = req.body.blogHeaderImage;
        (blog.text = req.body.text),
          (blog.images = req.body.images),
          (blog.creatorName = req.body.creatorName),
          (blog.dateSubmitted = req.body.dateSubmitted),
          (blog.datePublished = req.body.datePublished),
          (blog.dateUpdated = req.body.dateUpdated),
          (blog.isApproved = req.body.isApproved),
          (blog.numLikes = req.body.numLikes),
          (blog.numDislikes = req.body.numDislikes),
          (blog.reportsCounter = req.body.reportsCounter),
          (blog.interactionIdList = req.body.interactionIdList),
          (blog.commentsIdList = req.body.commentsIdList),
          (blog.numOfReads = req.body.numOfReads),
          (blog.status = req.body.status),
          (blog.reportlistList = req.body.reportlistList);
        const data = await blog.save();
        return HTTPRESPONSE.SUCCESS('Blog updated');
      }
    } catch (error) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },
  deleteBlog: async (req, res) => {
    try {
      let blog = await Blog.findOneAndDelete({ _id: req.params.id });
      if (blog) {
        return HTTPRESPONSE.SUCCESS('Deleted Successfully');

      } else {
        return HTTPRESPONSE.NOT_FOUND('Blog not found', {
          error: 'Blog not found',
        });
      }
    } catch (error) {
      return HTTPRESPONSE.CONFLICT('Error occurred', error);
    }
  },
};
