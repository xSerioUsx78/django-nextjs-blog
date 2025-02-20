from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from main.models import Post
from main.serializers import PostSerializer

# Model Test Case
class PostModelTest(TestCase):
    def test_model_creation(self):
        post = Post.objects.create(title="Test Title", content="Test Content")
        self.assertEqual(post.title, "Test Title")
        self.assertEqual(post.content, "Test Content")

# Serializer Test Case
class PostSerializerTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.post_data = {"title": "Serialized Post", "content": "Serialized Content"}
        cls.post = Post.objects.create(**cls.post_data)
        cls.serializer = PostSerializer(instance=cls.post)

    def test_serializer_data(self):
        """Test that the serializer correctly serializes data."""
        data = self.serializer.data
        self.assertEqual(data["title"], self.post.title)
        self.assertEqual(data["content"], self.post.content)

    def test_serializer_validation(self):
        """Test serializer validation with missing fields."""
        invalid_data = {"title": ""}
        serializer = PostSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)

# API Test Case
class PostAPITestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        """Set up a test post before running all tests."""
        cls.client = APIClient()
        cls.post = Post.objects.create(title="Test Post", content="Test Content")
        cls.post_url = reverse("post-detail", kwargs={"pk": cls.post.id})
        cls.post_list_url = reverse("post-list")

    def test_create_post(self):
        """Test creating a new post."""
        data = {"title": "New Post", "content": "New Content"}
        response = self.client.post(self.post_list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)

    def test_get_post_list(self):
        """Test retrieving a list of posts."""
        response = self.client.get(self.post_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Post.objects.count())

    def test_get_single_post(self):
        """Test retrieving a single post."""
        response = self.client.get(self.post_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.post.title)

    def test_update_post(self):
        """Test updating an existing post."""
        data = {"title": "Updated Title", "content": "Updated Content"}
        response = self.client.put(self.post_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, "Updated Title")

    def test_delete_post(self):
        """Test deleting a post."""
        response = self.client.delete(self.post_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)
